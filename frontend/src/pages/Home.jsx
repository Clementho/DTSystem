import { Box, Typography, Button } from "@mui/material";
import React from "react";
import HorizontalStack from "../components/HorizontalStack";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
    <Box 
      width="100%"
      height="100%"
      position="relative"
    >
      <Box 
        sx={{
          backgroundImage: "url('resources/landing-page.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          opacity: 0.6,
      }} />

      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>
        <Typography variant="h2" fontWeight="bold" fontSize="8vw">HyperETH</Typography>
        <br/><br/>
        <Typography variant="h5" fontWeight="bold" fontFamily="Orbitron">Where NFT Dreams Take Flight</Typography>
      </Box>
    </Box>

    <Box 
      position="relative"
      width="90%"
      height="100%"
      margin="100px auto"
      display="flex"
      alignItems="center"
    >
      <Box>
        <img
          src="resources/test2.jpeg"
          style={{
            width: "auto",
            height: "90vh",
            marginRight: "50px",
          }}
        />
      </Box>

      <Box>
        <Typography variant="h3" fontWeight="bold">Discover the HyperETH NFT Market</Typography>
        <br/>
        <Typography variant="h6" color="#AEAEAE">Dive into a vibrant marketplace filled with unique digital treasures, collectibles, and artistry. Our decentralized platform empowers you to explore, buy, and trade NFTs with ease. Don't miss out on the next big thing in digital ownership—start your journey now!</Typography>
        <br/><br/>
        <Box display="flex" alignItems="center">
          <NavLink to="/marketplace">
            <Button 
            variant="contained"
            size="large"
            sx={{
              marginRight: "30px",
              bgcolor: "#4800C6",
              fontWeight:"bold",
              letterSpacing: "2px",
              "&:hover": {
                bgcolor: "#7331e8"
              }
            }}>Explore Now</Button>
          </NavLink>
          <HorizontalStack />
        </Box>
      </Box>
    </Box>


    </>
  )
};

export default Home;
