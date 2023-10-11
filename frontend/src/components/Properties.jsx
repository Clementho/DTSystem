import { Grid } from "@mui/material";
import * as React from "react";
import PropertyCard from "./PropertyCard";

export default function Properties() {
  return (
    <Grid container spacing={4} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {products.map((product, index) => (
        <Grid item xs={1}>
          <PropertyCard rarity={75} />
        </Grid>
      ))}
    </Grid>
  );
}
