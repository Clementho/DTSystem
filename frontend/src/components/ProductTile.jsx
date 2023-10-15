import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

//https://mui.com/material-ui/react-card/#media

export default function ProductTile({product}) {

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-1.jpg`;

  return (
    <NavLink to={`/marketplace/${product.assetID}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "15px",
          "&:hover": {
            "& .card-content": {
              bgcolor: "#7331e8",
            },
          },
        }}
      >
        <CardMedia sx={{ height: 300 }} image={imageDir} title={product.assetName} />
        <CardContent className="card-content" sx={{ bgcolor: "#2B2430" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color:"#FFFFFF",
              fontSize:"1.5rem",
              fontWeight: "bold",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '240px',
            }}
          >
            {product.assetName}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#AEAEAE"
            marginTop="-10px"
            marginBottom="10px"
            fontSize="0.9rem"
          >
            {product.collectionName}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="15px"
          >
            <Box display="flex" alignItems="center">
              <img
                src={"resources/eth-logo-coloured.png"}
                alt="Currency"
                style={{ width: 20, height: 30, marginRight: 4 }}
              />
              <Typography variant="subtitle2" color="#FFFFFF" fontSize="1.2rem">
                {product.assetPrice}
              </Typography>
              <Typography
                marginLeft="3px"
                variant="subtitle2"
                color="#FFFFFF"
                fontSize="0.9rem"
              >
                ETH
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </NavLink>
  );
}