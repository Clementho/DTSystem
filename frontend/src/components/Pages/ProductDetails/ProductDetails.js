import React from "react";
import { useParams } from "react-router-dom";
import products from "../../../data/products.json";
import { Box, Grid, Button } from "@mui/material";
import ColorTabs from "./ProductTabs";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));
  const { prodID, productName, collectionName, productPrice } = product;

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;

  return (
    <>
      <Grid
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            paddingTop: "2.5%",
            paddingBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          },
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
        />
        <div
          style={{
            width: "450px",
            height: "300px",
            paddingLeft: "25px",
            paddingRight: "25px",
            backgroundColor: "#1B151F",
            borderRadius: "2.5%",
          }}
        >
          <h2>{productName}</h2>
          <p>{collectionName}</p>
          <h5 style={{ color: "gray" }}>Current Price</h5>
          <Grid
            sx={{
              display: {
                xs: "none",
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
            <h2>{productPrice}</h2>
          </Grid>

          <Grid
            sx={{
              display: {
                paddingTop: "5px",
                xs: "none",
                sm: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <div style={{ paddingRight: "20px" }}>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  display: "flex",
                  bgcolor: "#4800C6",
                  "&:hover": {
                    bgcolor: "#7331e8",
                  },
                }}
              >
                Buy Now
              </Button>
            </div>
            <div>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  display: "flex",
                  bgcolor: "#302338",
                  "&:hover": {
                    bgcolor: "#7331e8",
                  },
                }}
              >
                Make an Offer
              </Button>
            </div>
          </Grid>
        </div>
      </Grid>
      <Grid
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            paddingTop: "2.5%",
            paddingBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <ColorTabs />
      </Grid>
    </>
  );
};

export default ProductDetails;
