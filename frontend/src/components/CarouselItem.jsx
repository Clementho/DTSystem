import React from "react";
import "../styles/Carousel.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// Adapted from https://github.com/harakisgeorge/carouselreact\

export default function CarouselItem({product}) {
  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-2.jpg`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/marketplace/" + product.assetID);
  };

  return (
    <div className="carousel-item">
      <div className="carsousel-item-img-border">
        <img className="carousel-img" src={imageDir} />
      </div>
      <div className="carousel-item-text">
        <h5 style={{ fontStyle: "italic", color: "gray" }}>FEATURED</h5>
        <h2>{product.assetName}</h2>
        <p>
          {product.assetDescription}
        </p>
        <Button
          onClick={handleClick}
          size="medium"
          variant="contained"
          sx={{
            marginTop: "5vh",
            display: "flex",
            fontWeight: "bold",
            bgcolor: "#4800C6",
            "&:hover": {
              bgcolor: "#7331e8",
            },
            marginX: {
              xs: "auto",
              md: "0",
            },
          }}
        >
          View Listings
        </Button>
      </div>
    </div>
  );
}