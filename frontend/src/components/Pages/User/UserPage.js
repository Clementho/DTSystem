import React from "react"; 
import StickyHeadTable from "./Table/Table";
import UserProfile from "./UserProfile/UserProfile";
import { Box, Grid, TextField, Avatar, IconButton, Divider, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const User = () =>  { 
  return ( 
    <div>
      <UserProfile/>
      <StickyHeadTable/> 
    </div>
  )
}

export default User;
