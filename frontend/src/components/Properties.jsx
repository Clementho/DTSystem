import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import axios from "axios";

export default function Properties(props) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Make the Axios GET request to your FastAPI endpoint
    axios
      .get(`/api/db/get_properties_for_asset/${props.id}`)
      .then((response) => {
        // Handle the successful response
        setProperties(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error fetching properties:", error);
      });
  }, []);

  return (
    <Grid container spacing={4} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {properties.map((property, index) => (
        <Grid item xs={1}>
          <PropertyCard
            property={property}
            rarity={property.propertyRarity * 100}
          />
        </Grid>
      ))}
    </Grid>
  );
}