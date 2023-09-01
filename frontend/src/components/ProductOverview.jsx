import { Typography, Box, Avatar, Grid } from "@mui/material";
import * as React from "react";

export default function ProductOverview() {

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">Description</Typography>
      <Typography fontSize="1.1em">
            <br/>Behold the Galactic Cybernaut - A Digital Odyssey into Infinity! <br/><br/>

            Embark on an electrifying journey across the cosmos with this mesmerizing NFT masterpiece. The Galactic Cybernaut is not just an artwork; it's a portal to a universe where technology and imagination intertwine in a breathtaking dance of light and code. This otherworldly creation envisions a future where cybernetic beings traverse the galaxies,
            their bodies woven from ethereal strands of data and their minds synced with the pulsating rhythms of the stars. 
            Every pixel in this digital tapestry tells a story of exploration, curiosity, and the boundless potential of human ingenuity.
      </Typography>

      <Grid container columns={{xs:1, sm: 2}} display="flex" marginTop="10px" alignItems="center" justifyContent="space-evenly"> 
        <Grid xs={1} display="flex" marginY="20px" alignItems="center">
            <Avatar alt="Remy Sharp" src="/resources/profile-image2.jpg" sx={{ width: 110, height: 110 }}/>
            <Box marginLeft="15px">
                <Typography variant="subtitle1" sx={{color: "#AEAEAE"}}>Creator</Typography>
                <Typography variant="h5">s1MR4ndOmNFT</Typography>
            </Box>
        </Grid>

        <Grid xs={1} display="flex" marginY="20px" alignItems="center">
            <Avatar alt="Remy Sharp" src="/resources/profile-image.png" sx={{ width: 110, height: 110 }}/>
            <Box marginLeft="15px">
                <Typography variant="subtitle1" sx={{color: "#AEAEAE"}}>Current Owner</Typography>
                <Typography variant="h5">@SeltradeX</Typography>
            </Box>
        </Grid>
      </Grid>
    
    </Box>
  );
}
