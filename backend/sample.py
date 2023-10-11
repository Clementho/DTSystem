
# Sample data
lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " \
              "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " \
              "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " \
              "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia " \
              "deserunt mollit anim id est laborum. "

users_data = [
    {"userID": 1, "userName": "JohnDoe", "userBiography": lorem_ipsum, "userEmail": "john@example.com"},
    {"userID": 2, "userName": "Some guy", "userBiography": lorem_ipsum, "userEmail": "someguy@example.com"},
]

collections_data = [
    {"collectionID": 1, "collectionName": "Monkeys"},
    {"collectionID": 2, "collectionName": "Epic RAT"}
]

assets_data = [
    {"assetID": 1, "assetName": "Cool Monkey", "description": lorem_ipsum, "price": 10.0, "collectionID": 1},
    {"assetID": 2, "assetName": "Monkey", "description": lorem_ipsum, "price": 5.0, "collectionID": 1},
    {"assetID": 3, "assetName": "Monkey that looks cool", "description": lorem_ipsum, "price": 9.40, "collectionID": 1},
    {"assetID": 4, "assetName": "Vintage Monkey", "description": lorem_ipsum, "price": 3.20, "collectionID": 1},
    {"assetID": 5, "assetName": "Rat", "description": lorem_ipsum, "price": 0.15, "collectionID": 2},
]

properties_data = [
    {"propertyID": 1, "propertyName": "Monkeyness Rating", "propertyRarity": 0.7},
    {"propertyID": 2, "propertyName": "Rat", "propertyRarity": 0.5},
    {"propertyID": 3, "propertyName": "Golden", "propertyRarity": 0.8},
    {"propertyID": 4, "propertyName": "Shiny", "propertyRarity": 0.8},
    {"propertyID": 5, "propertyName": "Not even a monkey", "propertyRarity": 0.8},
]

# TODO add IDs later
asset_property_data = [
    {"assetPropertyID": 1, "propertyID": 1, "assetID": 1},
    {"assetPropertyID": 2, "propertyID": 1, "assetID": 2},
    {"assetPropertyID": 3, "propertyID": 1, "assetID": 3},
    {"assetPropertyID": 4, "propertyID": 1, "assetID": 4},
    {"assetPropertyID": 5, "propertyID": 2, "assetID": 4},
    {"assetPropertyID": 6, "propertyID": 3, "assetID": 4},
    {"assetPropertyID": 7, "propertyID": 3, "assetID": 3},
    {"assetPropertyID": 8, "propertyID": 5, "assetID": 5},
]
user_asset_data = [
    {"userAssetID": 1, "userID": 1, "assetID": 1, "userRole": "Owner"},
    {"userAssetID": 2, "userID": 1, "assetID": 2, "userRole": "Owner"},
    {"userAssetID": 3, "userID": 1, "assetID": 3, "userRole": "Owner"},
    {"userAssetID": 4, "userID": 1, "assetID": 4, "userRole": "Owner"},
    {"userAssetID": 5, "userID": 1, "assetID": 5, "userRole": "Owner"},
    {"userAssetID": 6, "userID": 2, "assetID": 1, "userRole": "Creator"},
    {"userAssetID": 7, "userID": 2, "assetID": 2, "userRole": "Creator"},
    {"userAssetID": 8, "userID": 2, "assetID": 3, "userRole": "Creator"},
    {"userAssetID": 9, "userID": 2, "assetID": 4, "userRole": "Creator"},
    {"userAssetID": 10, "userID": 2, "assetID": 5, "userRole": "Creator"}
]

# Insert data into the database
Session = SessionLocal()
try:
    # for user_data in users_data:
    #     user = User(**user_data)
    #     Session.add(user)

    # for collection_data in collections_data:
    #     collection = Collection(**collection_data)
    #     Session.add(collection)

    # for asset_data in assets_data:
    #     asset = Asset(**asset_data)
    #     Session.add(asset)
    #
    # for property_data in properties_data:
    #     property = Property(**property_data)
    #     Session.add(property)
    #
    # for asset_property_data in asset_property_data:
    #     asset_property = AssetProperty(**asset_property_data)
    #     Session.add(asset_property)

    # for user_asset_data in user_asset_data:
    #     user_asset = UserAsset(**user_asset_data)
    #     Session.add(user_asset)

    print("Inserted Successfully")
    Session.commit()
except Exception as e:
    print("Shit")
    Session.rollback()
    raise e
finally:
    Session.close()