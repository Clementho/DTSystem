import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Box, Typography } from "@mui/material";
import SectionTabs from "../components/SectionTabs";
import ProductOverview from "../components/ProductOverview";
import Properties from "../components/Properties";
import ActivityTable from "../components/ActivityTable";
import SnackBar from "../components/SnackBar";
import axios from "axios";

import { useBuyAsset } from "../hooks/useBuyAsset";
import { useGetTransactions } from "../hooks/useGetTransactions";

const ProductDetails = () => {
  // Get id of product through the url parameters
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  // Snackbar states
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("");
  const [tranxRows, setTranxRows] = useState([]);

  const { handleAssetPurchase, isPurchasing, purchaseError, purchaseSuccess } = useBuyAsset();
  const { tranxData, getTranxError, isFetchingTranx } = useGetTransactions();

  useEffect(() => {
    const rows = [];

    if(tranxData) { 

      tranxData.map((transaction) => {
        if(transaction.assetID == id){
          const row = {
            id: transaction.tradeID,
            profileImg: 'http://localhost:3000/resources/profile-image.png',
            action: "Purchase",
            assetName: transaction.assetName,
            initiator: transaction.buyer,
            receiver: transaction.seller,
            time: transaction.purchasedTime,
            amount: transaction.assetPrice,
          }
  
          rows.push(row)
        }
        
      })
    }

    setTranxRows(rows);

}, [tranxData]);

useEffect(() => {
  async function getAsset() {
    try {
      const response = await axios.get(`/api/db/get_asset/${id}`);
      const assetData = response.data;

      setProduct(assetData);
    } catch (error) {
      console.error("Error fetching asset: ", error);
    }
  }
  getAsset();
}, [id]);


//TODO: Clean this up when making the backend
const imageDir = `/resources/asset-${id}.jpg`;


  const handlePurchase = async () => {
    setSnackMessage("");

    const purchaseData = {
      "assetName": product.assetName,
      "assetPrice": product.assetPrice,
      "buyer": "0x780B021bc49E53a475b9Bf2b0D8817008BfE0468",
      "seller": product.ownerAddress
    }

    try {
      await handleAssetPurchase(id, purchaseData) 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(purchaseError) {
        setSnackMessage(purchaseError);
        setSnackSeverity("error");

    } else if (purchaseSuccess) {

      async function updateAsset() {
        const new_asset_owner = "0x780B021bc49E53a475b9Bf2b0D8817008BfE0468"
        
        try {
          // Make an API request to update the asset in the database
          await axios.put(`/api/db/update_asset_owner/${id}`, new_asset_owner);

          setSnackMessage("Purchase has been made successfully!");
          setSnackSeverity("success");

        } catch (error) {
          setSnackMessage("Something went wrong with your purchase. Please try again later");
          setSnackSeverity("error");
        }
      }

      updateAsset();

    }
}, [ purchaseError, purchaseSuccess ])

  return (

    <Grid container>

      <SnackBar message={snackMessage} severity={snackSeverity}/>
      <SnackBar message={isPurchasing ? "Your purchase is being processed...": ""} severity="info" />

      <Grid container
        sx={{
          display: {
            xs: "block",
            md: "flex",
          },
          padding: "20px 30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Grid item xs={12} md={6}>
          <Box 
            textAlign={{
              xs: "center",
              md: "right"
            }}
            marginRight={{
              xs: 0,
              md:"30px"
            }}
          >
          <img
            src={imageDir}
            style={{
              width: "30vw",
              height: "38vw",
              objectFit: "cover",
              borderRadius: "2.5%",
              boxShadow: "0px 0px 10px #fff",
            }}
          />
          </Box>
        </Grid>


        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "80%",
              height: "max-content",
              padding: "20px 25px",
              bgcolor: "#1B151F",
              borderRadius: "10px",
              margin: {
                xs: "30px auto",
                md: "0",
              }
            }}
          >

            <Typography sx={{
              fontWeight: "bold",
              fontSize: "2.4em",
            }}>
              {product.assetName}
            </Typography>

            <Typography sx={{
              color: "#9b02e8",
              fontSize: "1.15em",
              fontStyle: "italic",
            }}>
              {product.collectionName}
            </Typography>

            <Typography sx={{ color: "gray", fontWeight: "600", margin: "30px 0 10px 0"}}>Current Price</Typography>
            <Grid item
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  paddingBottom: "5px",
                },
              }}
            >
              <img
                src="/resources/eth-logo-coloured.png"
                alt="etherium"
                style={{ height: "60px", width: "40px", paddingRight: "15px" }}
              />
              <Typography sx={{
                fontWeight: "bold",
                fontSize: "1.6em",
              }}>
                {product.assetPrice} ETH
              </Typography>
            </Grid>

            <Grid item
              sx={{
                display: "flex",
                padding: "5px 0px",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "10px"
              }}
            >
                <Button
                  variant="contained"
                  onClick={handlePurchase}
                  sx={{
                    width: "45%",
                    fontSize: "1.1em",
                    fontWeight: "bolder",
                    bgcolor: "#4800C6",
                    "&:hover": {
                      bgcolor: "#7331e8",
                    },
                  }}
                >
                  Buy Now
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    width: "45%",
                    fontSize: "1.1em",
                    color: "#AEAEAE",
                    bgcolor: "#302338",
                    "&:hover": {
                      bgcolor: "#302338",
                      color: "#FFFFFF",
                      fontWeight: "bold"
                    },
                  }}
                >
                  Make Offer
                </Button>
            </Grid>
          </Box>
        </Grid>

      </Grid>

      <Grid container
        sx={{
          display: {
            xs: "flex",
            sm: "flex",
            paddingTop: "2.5%",
            paddingBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <SectionTabs
          sections={["Overview", "Properties", "Activity"]}
          components={[<ProductOverview description={product.assetDescription} creator={product.creatorAddress} owner={product.ownerAddress}/>, <Properties id={id}/>, <ActivityTable rows={tranxRows} isLoading={isFetchingTranx}/>]}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
