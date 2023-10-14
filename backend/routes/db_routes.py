from fastapi import Depends, HTTPException, APIRouter
from models.model import Collection, Asset, Property, AssetProperty
from sqlalchemy.orm import Session
from database.db import engine, SessionLocal, Base
from typing import Annotated, List, Optional
from pydantic import BaseModel

router = APIRouter()

Base.metadata.create_all(bind=engine)

class FilterParamsBody(BaseModel):
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    properties: Optional[List[str]] = None
    collection_name: Optional[str] = None

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
    asset = db.query(Asset).filter(Asset.assetID == asset_id).first()
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


# GET all assets
@router.get("/get_all_assets")
def get_all_assets(db: Session = Depends(get_db)):
    assets = db.query(Asset).all()
    return assets


@router.get("/filter")
async def get_filter( filter_params: FilterParamsBody, db: Session = Depends(get_db)):
    min_price = filter_params.min_price
    max_price = filter_params.max_price
    properties = filter_params.properties
    collection_name = filter_params.collection_name

    # Build the base query
    query = db.query(Asset).join(Collection).join(AssetProperty).join(Property)

    # Apply filters based on the request body
    if min_price is not None:
        query = query.filter(Asset.price >= min_price)
    if max_price is not None:
        query = query.filter(Asset.price <= max_price)
    if properties is not None:
        query = query.filter(Property.propertyName.in_(properties))
    if collection_name is not None:
        query = query.filter(Collection.collectionName.in_(collection_name))

    # Execute the query and return the filtered assets
    filtered_assets = query.all()
    return filtered_assets