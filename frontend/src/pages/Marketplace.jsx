import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductTile from "../components/ProductTile";
import SearchBar from "../components/SearchBar";
import SortOptionsBar from "../components/SortOptionsBar";
import CollapsedFilterBar from "../components/CollapsedFilterBar";
import ExpandedFilterBar from "../components/ExpandedFilterBar";
import Carousel from "../components/Carousel";

import products from "../data/products.json";

const Marketplace = () => {
  const [expandFilter, setExpandFilter] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#011C25",
        }}
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Carousel />
        </Grid>
      </div>

      <h1>Marketplace</h1>

    <Box sx={{flexGrow: 1, width: "95%", margin: "auto", display: "flex", columnGap: "20px"}}> 
    

      { expandFilter && <ExpandedFilterBar expandFilter={expandFilter} setExpandFilter={setExpandFilter}/> }

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12, lg: 20 }}>
        
          <Grid item xs={4} sm={9} md={12} lg={20}>
            <Box 
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{
                marginLeft: expandFilter ? "-20px" : 0
              }}
            >
              { !expandFilter && <CollapsedFilterBar setExpandFilter={setExpandFilter}/> }
              <SearchBar placeholder="Search..."/>
              <SortOptionsBar />
            </Box>
          </Grid>

          {products.map((product, index) => (
             // Dynamically adjust each product tile's size within the grid system if filter bar is expanded/collapsed
             <Grid item xs={2} sm={3} md={ expandFilter? 4 : 3 } lg={ expandFilter ? 5 : 4 } key={index}> 
              <ProductTile key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Marketplace;


