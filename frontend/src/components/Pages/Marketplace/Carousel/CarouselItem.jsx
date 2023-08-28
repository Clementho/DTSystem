import React from "react";
import "./Carousel.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const CarouselItem = (props) => {
  const { id, productName, collectionName, productPrice } = props.product;
  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/marketplace/" + id);
  };

  return (
    <div className="carousel-item">
      <div className="carsousel-item-img-border">
        <img className="carousel-img" src={imageDir} />
      </div>
      <div className="carousel-item-text">
        <h5 style={{ fontStyle: "italic", color: "gray" }}>FEATURED</h5>
        <h2>{productName}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <Button
          onClick={handleClick}
          size="medium"
          variant="contained"
          sx={{
            marginTop: "5vh",
            display: "flex",
            bgcolor: "#4800C6",
            "&:hover": {
              bgcolor: "#7331e8",
            },
          }}
        >
          View Listings
        </Button>
      </div>
    </div>
  );
};