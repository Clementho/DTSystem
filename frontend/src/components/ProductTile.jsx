import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

//https://mui.com/material-ui/react-card/#media

export default function ProductTile(props) {
  const navigate = useNavigate();
  const { id, productName, collectionName, productPrice } = props.product;

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;

  const handleClick = () => {
    navigate("/marketplace/" + id);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "15px" }}>
      <CardMedia sx={{ height: 300 }} image={imageDir} title={productName} />
      <CardContent sx={{ bgcolor: "#2B2430" }}>
        <Typography gutterBottom variant="h5" component="div" color="#FFFFFF">
          {productName}
        </Typography>
        <Typography
          variant="subtitle2"
          color="#AEAEAE"
          marginTop="-10px"
          marginBottom="10px"
        >
          {collectionName}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <img
              src={"resources/eth-logo-coloured.png"}
              alt="Currency"
              style={{ width: 20, height: 30, marginRight: 4 }}
            />
            <Typography variant="subtitle2" color="#FFFFFF" fontSize="1.2em">
              {productPrice} ETH
            </Typography>
          </Box>

          <Button
            onClick={handleClick}
            size="medium"
            variant="contained"
            sx={{
              bgcolor: "#4800C6",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#7331e8",
              },
            }}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
