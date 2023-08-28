import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

import ProductTile from "../../ProductTile";
import SearchBar from "../../SearchBar";
import SortOptionsBar from "../../SortOptionsBar";
import CollapsedFilterBar from "../../CollapsedFilterBar";
import ExpandedFilterBar from "../../ExpandedFilterBar";

const Marketplace = () => {

  const [expandFilter, setExpandFilter] = useState(true)

  return (
    <>
    <h1>Marketplace</h1>

    {/* JUST TESTING SO FEEL FREE TO CHANGE */}

    {/* xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px */}

    <Box sx={{flexGrow: 1, width: "95%", margin: "auto", display: "flex", columnGap: "20px"}}> 
    

      { expandFilter && <ExpandedFilterBar setExpandFilter={setExpandFilter}/> }

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
        
    
          
          {Array.from(Array(10)).map((product, index) => (
            // Dynamically adjust each product tile's size within the grid system if filter bar is expanded/collapsed
            <Grid item xs={2} sm={3} md={3} lg={ expandFilter ? 5 : 4 } key={index}> 
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
