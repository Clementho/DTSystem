import React, { useState, useEffect } from "react";
import { Box, Grid, useScrollTrigger } from "@mui/material";
import ProductTile from "../components/ProductTile";
import SearchBar from "../components/SearchBar";
import SortOptionsBar from "../components/SortOptionsBar";
import CollapsedFilterBar from "../components/CollapsedFilterBar";
import ExpandedFilterBar from "../components/ExpandedFilterBar";
import Carousel from "../components/Carousel";
import axios from "axios";

const backendURL = "http://localhost:8000";

const Marketplace = () => {
  const [expandFilter, setExpandFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${backendURL}/get_all_assets`);
        const assetsData = response.data;
        setProducts(assetsData);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    }
    getAllAssets();
  }, []);

  const handleFilteredAssets = async (body) => {
    console.log(body);
    console.log(body.properties);
    axios.defaults.headers["Content-Type"] = "application/json";
    const response = await axios.post("http://localhost:8000/filter", {
      min_price: body.min_price,
      max_price: body.max_price,
      properties: body.properties,
      collection_name: body.collection_name,
    });
    const filteredAssets = response.data;
    setProducts(filteredAssets);
  };

  return (
    <>
      {/* Product Carousel component rendered here*/}
      <div
        style={{
          width: "100%",
          backgroundColor: "#011C25",
        }}
      >
        <Grid justifyContent="center" alignItems="center" display="flex">
          <Carousel products={products} />
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
                <CollapsedFilterBar setExpandFilter={setExpandFilter} />
              )}
              <SearchBar type="text" placeholder="Search..." />
              <SortOptionsBar />
            </Box>
          </Grid>

          {products.map((product, index) => (
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
        </Grid>
      </Box>
    </>
  );
};

export default Marketplace;
