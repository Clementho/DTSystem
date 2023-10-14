from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Collection(Base):
    __tablename__ = 'collection'

    collectionID = Column(Integer, primary_key=True)
    collectionName = Column(String(255), nullable=False)


class Asset(Base):
    __tablename__ = 'asset'

    assetID = Column(Integer, primary_key=True)
    assetName = Column(String(50), nullable=False)
    assetIMGPath = Column(String(255), default=None)
    price = Column(Float, default=None)
    description = Column(String(550), default=None)
    collectionID = Column(Integer, ForeignKey('collection.collectionID'))

    collection = relationship('Collection', backref='assets')


class Property(Base):
    __tablename__ = 'property'

    propertyID = Column(Integer, primary_key=True)

    propertyName = Column(String(50), nullable=False)
    propertyRarity = Column(Float, nullable=False)


class AssetProperty(Base):
    __tablename__ = 'asset_property'

    assetPropertyID = Column(Integer, primary_key=True)

    propertyID = Column(Integer, ForeignKey('property.propertyID'), nullable=False)
    assetID = Column(Integer, ForeignKey('asset.assetID'), nullable=False)


class UserAsset(Base):
    __tablename__ = 'user_asset'

    userAssetID = Column(Integer, primary_key=True)

    userID = Column(Integer, ForeignKey('user.userID'), nullable=False)
    assetID = Column(Integer, ForeignKey('asset.assetID'), nullable=False)
    userRole = Column(Enum("Owner", "Creator"), nullable=False)

    user = relationship('User', backref='user_assets')
    asset = relationship('Asset', backref='user_assets')