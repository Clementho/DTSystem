from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Collection(Base):
    __tablename__ = 'collection'

    collectionID = Column(Integer, primary_key=True)

    collectionName = Column(String(255), nullable=False)


class PropertyCategory(Base):
    __tablename__ = 'property_category'

    propertyCatID = Column(Integer, primary_key=True)

    propertyCatName = Column(String(50), nullable=False)


class Asset(Base):
    __tablename__ = 'asset'

    assetID = Column(Integer, primary_key=True)

    assetName = Column(String(50), nullable=False)
    assetDescription = Column(String(550), default=None)
    assetPrice = Column(Float, default=None)
    creatorAddress = Column(String(255), default=None)
    ownerAddress = Column(String(255), default=None)
    collectionID = Column(Integer, ForeignKey('collection.collectionID'))

    collection = relationship('Collection', backref='assets')


class Property(Base):
    __tablename__ = 'property'

    propertyID = Column(Integer, primary_key=True)

    propertyName = Column(String(50), nullable=False)
    propertyRarity = Column(Float, nullable=False)
    propertyCatID = Column(Integer, ForeignKey('PropertyCategory.propertyCatID'))


class AssetProperty(Base):
    __tablename__ = 'asset_property'

    assetPropertyID = Column(Integer, primary_key=True)
    
    assetID = Column(Integer, ForeignKey('asset.assetID'), nullable=False)
    propertyID = Column(Integer, ForeignKey('property.propertyID'), nullable=False)
