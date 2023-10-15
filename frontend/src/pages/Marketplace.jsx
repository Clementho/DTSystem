import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import ProductTile from "../components/ProductTile";
import AssetSearchBar from "../components/AssetSearchBar";
import SortOptionsBar from "../components/SortOptionsBar";
import CollapsedFilterBar from "../components/CollapsedFilterBar";
import ExpandedFilterBar from "../components/ExpandedFilterBar";
import Carousel from "../components/Carousel";
import SnackBar from "../components/SnackBar";
import axios from "axios";

const Marketplace = () => {
  const [expandFilter, setExpandFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Snackbar states
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("");

  // Only display the first X products for the carousel
  const carouselProducts = products.slice(0, 8);

  useEffect(() => {
    // Fetch all assets when the component loads
    async function getAllAssets() {
      try {
        const response = await axios.get(`/api/db/get_all_assets`);
        const assetsData = response.data;
        setProducts(assetsData);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    }
    getAllAssets();
  }, []);

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.assetName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilteredAssets = async (body) => {
    if(
      isNaN(body.min_price) && 
      isNaN(body.max_price) && 
      body.properties.length === 0
    ) {
      setSnackMessage("No search filters were applied...")
      setSnackSeverity("warning")

    } else {
      setSnackMessage("Search filters applied")
      setSnackSeverity("success")

      axios.defaults.headers["Content-Type"] = "application/json";
      const response = await axios.post("/api/db/filter", {
        min_price: body.min_price,
        max_price: body.max_price,
        properties: body.properties,
      });
      const filteredAssets = response.data;
      setProducts(filteredAssets);
    } 
    
  };

  const clearFilters = async () => {
    try {
      const response = await axios.get("/api/db/get_all_assets");
      const assetsData = response.data;
      setProducts(assetsData);
      setSearchTerm(""); // Clear the search term
      setFiltersApplied(false); // Filters have been cleared
      setSnackMessage("Search filters cleared")
      setSnackSeverity("info")

    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
  

  return (
    <>
      <SnackBar message={snackMessage} severity={snackSeverity}/>

      {/* Product Carousel component rendered here*/}
      <div
        style={{
          width: "100%",
          backgroundColor: "#011C25",
        }}
      >
        <Grid justifyContent="center" alignItems="center" display="flex">
          <Carousel products={carouselProducts} />
        </Grid>
      </div>

      <h1>Marketplace</h1>

      {/* Marketplace asset listing & search, filter, sort components rendered here */}
      <Box
        sx={{
          flexGrow: 1,
          width: "95%",
          margin: "auto",
          display: "flex",
          columnGap: "20px",
        }}
      >
        {/* Renders expanded filter bar if expandFilter = true */}
        {expandFilter && (
          <ExpandedFilterBar
            expandFilter={expandFilter}
            setExpandFilter={setExpandFilter}
            onFilter={handleFilteredAssets}
            filtersApplied={filtersApplied}
            setFiltersApplied={setFiltersApplied}
            clearFilters={clearFilters}
          />
        )}

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 9, md: 12, lg: 20 }}
        >
          <Grid item xs={4} sm={9} md={12} lg={20}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{
                marginLeft: expandFilter ? "-20px" : 0,
              }}
            >
              {/* Renders collapsed filter bar if expandFilter = false */}
              {!expandFilter && (
                <CollapsedFilterBar setExpandFilter={setExpandFilter} filtersApplied={filtersApplied} />
              )}
              <AssetSearchBar type="text" placeholder="Search NFTs..." onSearch={handleSearch}/>
              <SortOptionsBar products={filteredProducts || products} setFilteredProducts={setFilteredProducts} />
            </Box>
          </Grid>

          {filteredProducts.map((product, index) => (
            // Dynamically adjust each product tile's size within the grid system if filter bar is expanded/collapsed
            <Grid
              item
              xs={2}
              sm={3}
              md={expandFilter ? 4 : 3}
              lg={expandFilter ? 5 : 4}
              key={index}
            >
              <ProductTile key={product.assetID} product={product} />
            </Grid>
          ))}

          {filteredProducts.length === 0 && 
            <Grid
              item
              xs={4}
              sm={9}
              md={12}
              lg={20}
              
            >
              <Box
                sx={{
                  padding: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "400px",
                }}
              >
                <img 
                  src="/resources/no-result.png"
                  style={{
                    display: "block",
                    maxWidth: "40%",
                    height: "auto"
                  }}
                />
                <Typography variant="h5" color="white" marginTop="30px">
                  No products found for "{searchTerm}"
                </Typography>
              </Box>
            
            </Grid>
          }
        </Grid>
      </Box>
    </>
  );
};

export default Marketplace;