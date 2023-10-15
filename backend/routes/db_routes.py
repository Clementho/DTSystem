from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status, Query, Path, APIRouter
from typing import Annotated, List, Optional
from models.model import Collection, Asset, Property, AssetProperty, PropertyCategory
from database.db import engine, SessionLocal, Base
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_
from pydantic import BaseModel

router = APIRouter()

Base.metadata.create_all(bind=engine)

class FilterParamsBody(BaseModel):
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    properties: Optional[List[int]] = None
    collection_name: Optional[str] = None


class PropertyWithCategory(BaseModel):
    propertyID: int
    propertyName: str
    propertyRarity: float
    propertyCatName: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependancy = Annotated[Session, Depends(get_db)]

# GET collection by ID
@router.get("/get_collection/{collection_id}")
def get_collection(collection_id: int, db: Session = Depends(get_db)):
    collection = db.query(Collection).filter(Collection.collectionID == collection_id).first()
    if collection is None:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection


# GET asset by ID
@router.get("/get_asset/{asset_id}")
def get_asset(asset_id: int, db: Session = Depends(get_db)):
    # Join the Asset and Collection tables to fetch the collection name
    asset = db.query(Asset, Collection.collectionName).\
        join(Collection, Asset.collectionID == Collection.collectionID).\
        filter(Asset.assetID == asset_id).first()
    
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # 'asset' now contains both Asset and Collection data
    asset_data, collection_name = asset[0], asset[1]

    return {
        "assetID": asset_data.assetID,
        "assetName": asset_data.assetName,
        "assetDescription": asset_data.assetDescription,
        "assetPrice": asset_data.assetPrice,
        "ownerAddress": asset_data.ownerAddress,
        "creatorAddress": asset_data.creatorAddress,
        "collectionName": collection_name,
    }


# GET all assets
@router.get("/get_all_assets")
def get_all_assets(db: Session = Depends(get_db)):
    # Join the Asset and Collection tables to fetch the collection name
    assets = db.query(Asset, Collection.collectionName).\
        join(Collection, Asset.collectionID == Collection.collectionID).all()

    if not assets:
        raise HTTPException(status_code=404, detail="No assets found")

    # Process the list of assets and resolve the 'collectionName' for each asset
    asset_list = []
    for asset_data, collection_name in assets:
        asset_info = {
            "assetID": asset_data.assetID,
            "assetName": asset_data.assetName,
            "assetDescription": asset_data.assetDescription,
            "assetPrice": asset_data.assetPrice,
            "ownerAddress": asset_data.ownerAddress,
            "creatorAddress": asset_data.creatorAddress,
            "collectionName": collection_name,
        }
        asset_list.append(asset_info)

    return asset_list

# GET all properties grouped by category
@router.get("/get_all_properties_grouped")
def get_all_properties_grouped(db: Session = Depends(get_db)):
    # Query properties and their associated categories
    properties = db.query(Property.propertyID, Property.propertyName, Property.propertyRarity, PropertyCategory.propertyCatName). \
        join(PropertyCategory, Property.propertyCatID == PropertyCategory.propertyCatID).all()

    # Create a dictionary to group properties by category
    property_data = {}

    for prop in properties:
        property_info = {
            "propertyID": prop.propertyID,
            "propertyName": prop.propertyName,
            "propertyRarity": prop.propertyRarity,
        }

        category_name = prop.propertyCatName

        if category_name not in property_data:
            property_data[category_name] = []

        property_data[category_name].append(property_info)

    return property_data



# GET properties by asset ID
@router.get("/get_properties_for_asset/{asset_id}")
def get_properties_for_asset(asset_id: int = Path(...), db: Session = Depends(get_db)):
    asset_properties = db.query(AssetProperty).filter(AssetProperty.assetID == asset_id).all()
    if not asset_properties:
        raise HTTPException(status_code=404, detail="Asset not found")

    # Get the associated properties for the asset from the junction table
    property_ids = [asset_property.propertyID for asset_property in asset_properties]
    properties = db.query(Property).filter(Property.propertyID.in_(property_ids)).all()

    property_list = []

    # Process the properties to resolve the property category name
    for property in properties:
        property_category = db.query(PropertyCategory).filter(PropertyCategory.propertyCatID == property.propertyCatID).first()

        property_info = {
            "propertyID": property.propertyID,
            "propertyName": property.propertyName,
            "propertyRarity": property.propertyRarity,
            "propertyCatName": property_category.propertyCatName,
        }

        property_list.append(property_info)

    return property_list

# Update asset owner address
@router.put("/update_asset_owner/{asset_id}")
async def update_asset_owner(asset_id: int, new_asset_owner: str, db: Session = Depends(get_db)):
    # Retrieve the asset to update
    asset = db.query(Asset).filter(Asset.assetID == asset_id).first()
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")

    # Update the ownerAddress attribute of the asset
    asset.ownerAddress = new_asset_owner

    # Commit the changes to the database
    db.commit()

    # Return the updated asset data
    return asset




# GET collection name by ID
@router.get("/get_collection_name/{collection_id}")
def get_collection_name(collection_id: int, db: Session = Depends(get_db)):
    collection = db.query(Collection).filter(Collection.collectionID == collection_id).first()
    if collection is None:
        raise HTTPException(status_code=404, detail="Collection not found")
    return {"collection_name": collection.collectionName}


@router.post("/filter")
async def get_filter(filter_params: FilterParamsBody, db: Session = Depends(get_db)):
    min_price = filter_params.min_price
    max_price = filter_params.max_price
    property_ids = filter_params.properties
    collection_name = filter_params.collection_name

    # Base SQL query
    query = db.query(Asset).join(Collection).join(AssetProperty).join(Property)

    # Build the WHERE clause based on filter parameters
    filters = []

    if min_price is not None and max_price is not None:
        # Add a filter to select assets with prices within the specified range
        filters.append(and_(Asset.assetPrice >= min_price, Asset.assetPrice <= max_price))
    elif min_price is not None:
        filters.append(Asset.assetPrice >= min_price)
    elif max_price is not None:
        filters.append(Asset.assetPrice <= max_price)

    if property_ids is not None:
        # Add a filter to select assets with any of the specified properties
        filters.append(Property.propertyID.in_(property_ids))
    if collection_name is not None:
        filters.append(Collection.collectionName.in_([collection_name]))

    # Apply the filters to the query using the OR operator for properties
    if filters:
        query = query.filter(or_(*filters))

    # Execute the query and return the filtered assets
    assets = query.all()

    # Process the assets to resolve property categories
    filtered_assets = []
    for asset in assets:
        asset_properties = db.query(AssetProperty).filter(AssetProperty.assetID == asset.assetID).all()
        property_ids = [ap.propertyID for ap in asset_properties]
        properties = db.query(Property).filter(Property.propertyID.in_(property_ids)).all()

        # Resolve property categories for the asset
        property_info_list = []
        for property in properties:
            property_category = db.query(PropertyCategory).filter(PropertyCategory.propertyCatID == property.propertyCatID).first()
            property_info = PropertyWithCategory(
                propertyID=property.propertyID,
                propertyName=property.propertyName,
                propertyRarity=property.propertyRarity,
                propertyCatName=property_category.propertyCatName
            )
            property_info_list.append(property_info)

        asset_info = {
            "assetID": asset.assetID,
            "assetName": asset.assetName,
            "assetDescription": asset.assetDescription,
            "assetPrice": asset.assetPrice,
            "ownerAddress": asset.ownerAddress,
            "creatorAddress": asset.creatorAddress,
            "collectionName": asset.collection.collectionName,
            "properties": property_info_list
        }
        filtered_assets.append(asset_info)

    return filtered_assets




# GET assets by name
@router.get("/get_assets_by_name/{asset_name}")
def get_assets_by_name(asset_name: str = Path(...),
                       db: Session = Depends(get_db)):
    assets = db.query(Asset).filter(Asset.assetName == asset_name).all()
    if not assets:
        raise HTTPException(status_code=404, detail="No assets found with the provided name")
    return assets