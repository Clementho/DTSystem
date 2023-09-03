import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { Grid, Button } from "@mui/material";
import SectionTabs from "../components/SectionTabs";
import ProductOverview from "../components/ProductOverview";
import Properties from "../components/Properties";
import ActivityTable from "../components/ActivityTable";

const ProductDetails = () => {
  // Get id of product through the url parameters
  const { id } = useParams();

  // Searches for product in local cache and assigns it
  const product = products.find((product) => product.id === parseInt(id));
  const { prodID, productName, collectionName, productPrice } = product;

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;

  return (
    <Grid container columns={{ xs: 2 }}>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          padding: "20px 30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imageDir}
          style={{
            width: "450px",
            height: "600px",
            objectFit: "cover",
            borderRadius: "2.5%",
            boxShadow: "0px 0px 10px #fff",
            marginRight: "50px",
          }}
          alt="Product"
        />
        <Grid
          item
          sx={{
            width: "35%",
            height: "max-content",
            padding: "20px 25px",
            bgcolor: "#1B151F",
            borderRadius: "10px",
          }}
        >
          <h2>{productName}</h2>
          <p>{collectionName}</p>
          <h5 style={{ color: "gray" }}>Current Price</h5>
          <Grid
            item
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
            <h2>{productPrice} ETH</h2>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              padding: "5px 0px",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
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
                  fontWeight: "bold",
                },
              }}
            >
              Make an Offer
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        xs={2}
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
          components={[<ProductOverview />, <Properties />, <ActivityTable />]}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
