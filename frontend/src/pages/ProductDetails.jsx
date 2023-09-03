import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { Box, Grid, Button } from "@mui/material";
import SectionTabs from "../components/SectionTabs";
import ProductOverview from '../components/ProductOverview';
import Properties from '../components/Properties';
import ActivityTable from "../components/ActivityTable";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));
  const { prodID, productName, collectionName, productPrice } = product;

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;

  return (
    <Grid container>
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
            <h2>{productName}</h2>
            <p>{collectionName}</p>
            <h5 style={{ color: "gray" }}>Current Price</h5>
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
              <h2>{productPrice} ETH</h2>
            </Grid>

            <Grid item
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
        <SectionTabs sections={["Overview", "Properties", "Activity"]} components={[<ProductOverview />, <Properties />,  <ActivityTable />]}/>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
