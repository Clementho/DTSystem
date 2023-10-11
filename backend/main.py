# uvicorn main:app --reload

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status, Query, Path
from typing import Annotated, List, Optional
from models import User, Collection, Asset, Property, UserAsset, AssetProperty
import models
from database import engine, SessionLocal, Base
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


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


# GET user by ID
@app.get("/get_user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.userID == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# GET collection by ID
@app.get("/get_collection/{collection_id}")
def get_collection(collection_id: int, db: Session = Depends(get_db)):
    collection = db.query(Collection).filter(Collection.collectionID == collection_id).first()
    if collection is None:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection


# GET asset by ID
@app.get("/get_asset/{asset_id}")
def get_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(Asset).filter(Asset.assetID == asset_id).first()
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


# GET all assets
@app.get("/get_all_assets")
def get_all_assets(db: Session = Depends(get_db)):
    assets = db.query(Asset).all()
    return assets


# GET properties by asset ID
@app.get("/get_properties_for_asset/{asset_id}")
def get_properties_for_asset(asset_id: int = Path(..., description="The ID of the asset to retrieve properties for"),
                             db: Session = Depends(get_db)):
    asset_properties = db.query(AssetProperty).filter(AssetProperty.assetID == asset_id).all()
    if not asset_properties:
        raise HTTPException(status_code=404, detail="Asset not found")

    # Get the associated properties for the asset from the junction table
    property_ids = [asset_property.propertyID for asset_property in asset_properties]
    properties = db.query(Property).filter(Property.propertyID.in_(property_ids)).all()

    return properties


# GET collection name by ID
@app.get("/get_collection_name/{collection_id}")
def get_collection_name(collection_id: int, db: Session = Depends(get_db)):
    collection = db.query(Collection).filter(Collection.collectionID == collection_id).first()
    if collection is None:
        raise HTTPException(status_code=404, detail="Collection not found")
    return {"collection_name": collection.collectionName}


@app.get("/filter")
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


@app.get("/")
async def ping():
    return "Hello world"

