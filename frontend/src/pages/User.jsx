import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ActivityTable from '../components/ActivityTable';
import { Grid, Box, Avatar, Typography, Button } from '@mui/material';
import SectionTabs from '../components/SectionTabs';
import ProductTile from '../components/ProductTile';
import CollapsedFilterBar from '../components/CollapsedFilterBar';
import ExpandedFilterBar from '../components/ExpandedFilterBar';
import SearchBar from "../components/SearchBar";
import SortOptionsBar from "../components/SortOptionsBar";

import ShareIcon from '@mui/icons-material/Share';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import products from "../data/products.json"

const User = () =>  {
  const [expandFilter, setExpandFilter] = useState(false);

  const UserItems = () => (
    <Box sx={{flexGrow: 1, width: "100%", margin: "auto", display: "flex", columnGap: "20px"}}> 
    
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
             <Grid item xs={2} sm={3} lg={ expandFilter ? 5 : 4 } key={index}> 
              <ProductTile key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
  )

  return (
    <Grid container columns={{xs: 2}}>
      <Grid item xs={2}>
        <Box position="relative">
          <Box 
            sx={{
              backgroundImage: "url('resources/profile-banner.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "45vh",
              width: "100%",
          }}></Box>
          <Avatar 
            alt="Remy Sharp"
            src="/resources/profile-image.png" 
            sx={{ 
              width: 180, 
              height: 180,
              position: "absolute",
              top: "45vh",
              left: "5vw",
              translate: "0% -70%", //offset by 70% of own height
          }}/>
        </Box>
      </Grid>

      <Grid item xs={2} marginTop="80px" display="flex" justifyContent="center">
        <Box margin="auto" width="55%">
          <Typography variant="h3">@SeltradeX</Typography>
          <br/>
          <Typography fontSize="1.2vw">Hey there, I'm Max – your friendly neighborhood NFT and crypto explorer! Join me on my exhilarating journey through the NFT cosmos and the crypto universe – where pixels meet prosperity, and innovation knows no bounds.</Typography> 
          <br/>
          <Typography fontSize="1.2vw" fontWeight="bold">#NFTs #CryptoArt #DeFiWizard #10YearsStrong #MetaverseExplorer</Typography>
        </Box>

        <Box margin="auto" width="30%" height="100%" textAlign="right">
          <ShareIcon sx={{ fontSize:"4vh", margin: "0 10px", cursor: "pointer", color: "#AEAEAE", "&:hover":{ color: "#FFFFFF"}}}/>
          <NavLink to="/editprofile">
            <ManageAccountsIcon sx={{ fontSize:"4vh", margin: "0 10px", cursor: "pointer", color: "#AEAEAE", "&:hover":{ color: "#FFFFFF"}}}/>
          </NavLink>
        </Box>
      </Grid>

      <Grid item xs={2} display="flex" alignItems="center" justifyContent="center" marginTop="50px">
        <SectionTabs sections={["Items", "Transactions"]} components={[<UserItems />, <ActivityTable />]}/>
      </Grid>
    </Grid>
  );
}
export default User;

