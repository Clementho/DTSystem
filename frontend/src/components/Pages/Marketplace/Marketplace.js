import React from "react";
import { Box, Grid } from "@mui/material";

import ProductTile from "../../ProductTile";

const Marketplace = () => {
  return (
    <>
    <h1>Marketplace</h1>

    {/* JUST TESTING SO FEEL FREE TO CHANGE */}

    {/* xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px */}

    <Box sx={{flexGrow: 1, width: "95%", margin: "auto"}}> 
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12, lg: 15 }}>
    
      {Array.from(Array(10)).map((product, index) => (
        <Grid item xs={2} sm={3} key={index}>
          <ProductTile
            productImage={`/resources/asset-${index+1}.jpg`}
            productName={`asset-${index+1}`}
            collectionName="avaeva"
            productPrice="002.3"
            productLink=""
          />
        </Grid>
      ))}
    </Grid>
    </Box>
    </>
  );
};

export default Marketplace;
