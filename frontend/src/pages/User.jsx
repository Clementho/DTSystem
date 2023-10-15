import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ActivityTable from '../components/ActivityTable';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import SectionTabs from '../components/SectionTabs';
import ProductTile from '../components/ProductTile';

import ShareIcon from '@mui/icons-material/Share';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useGetProfile } from "../hooks/useGetProfile";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetOwnedAssets } from "../hooks/useGetOwnedAssets";

const User = () =>  {
  const { fetchProfile, profileData, getProfileError, isFetching } = useGetProfile();
  const { tranxData, getTranxError, isFetchingTranx } = useGetTransactions();
  const { ownedAssets, fetchOwnedAssets, getOwnedAssetsError, isFetchingOwnedAssets } = useGetOwnedAssets();
  const [tranxRows, setTranxRows] = useState([]);

    useEffect(() => {
      const rows = [];
      if(tranxData) { 
  
        tranxData.map((transaction) => {
          const row = {
            id: transaction.tradeID,
            profileImg: 'resources/profile-image.png',
            action: "Sale",
            assetName: transaction.assetName,
            initiator: transaction.buyer,
            receiver: transaction.seller,
            time: transaction.purchasedTime,
            amount: transaction.assetPrice,
          }
  
          rows.push(row)
        })
      }
  
      setTranxRows(rows);
    
    }, [tranxData]);

    // Fetch user profile details & owned assets on mount
    useEffect(() => {
      fetchProfile("0x780B021bc49E53a475b9Bf2b0D8817008BfE0468");
      fetchOwnedAssets("0x780B021bc49E53a475b9Bf2b0D8817008BfE0468");
    }, []);

  const UserItems = () => (
    <Box sx={{flexGrow: 1, width: "100%", margin: "auto", display: "flex", columnGap: "20px"}}> 
    
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12, lg: 20 }}>
          {ownedAssets.map((product, index) => (
             // Dynamically adjust each product tile's size within the grid system if filter bar is expanded/collapsed
             <Grid item xs={2} md={4} lg={5} key={index}> 
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
          <Typography variant="h3">{profileData ? profileData.name : ""}</Typography>
          <br/>
          <Typography fontSize="1.2vw">{profileData ? profileData.biography : ""}</Typography>
        </Box>

        <Box margin="auto" width="30%" height="100%" textAlign="right">
          <ShareIcon sx={{ fontSize:"4vh", margin: "0 10px", cursor: "pointer", color: "#AEAEAE", "&:hover":{ color: "#FFFFFF"}}}/>
          <NavLink to="/editprofile">
            <ManageAccountsIcon sx={{ fontSize:"4vh", margin: "0 10px", cursor: "pointer", color: "#AEAEAE", "&:hover":{ color: "#FFFFFF"}}}/>
          </NavLink>
        </Box>
      </Grid>

      <Grid item xs={2} display="flex" alignItems="center" justifyContent="center" marginTop="50px">
        <SectionTabs sections={["Items", "Transactions"]} components={[<UserItems />, <ActivityTable rows={tranxRows} isLoading={isFetchingTranx} />]}/>
      </Grid>
    </Grid>
  );
}
export default User;

