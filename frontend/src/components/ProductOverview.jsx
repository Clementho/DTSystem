import { Typography, Box, Avatar, Grid } from "@mui/material";
import * as React from "react";

export default function ProductOverview(props) {
  const { description } = props;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Description
      </Typography>
      <Typography fontSize="1.1em">
        <br />
        {description}
        <br />
      </Typography>

      <Grid
        container
        columns={{ xs: 1, md: 2 }}
        display="flex"
        marginTop="10px"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid xs={1} display="flex" marginY="20px" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="/resources/profile-image2.jpg"
            sx={{ width: 110, height: 110 }}
          />
          <Box marginLeft="15px">
            <Typography variant="subtitle1" sx={{ color: "#AEAEAE" }}>
              Creator
            </Typography>
            <Typography variant="h5">s1MR4ndOmNFT</Typography>
          </Box>
        </Grid>

        <Grid xs={1} display="flex" marginY="20px" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="/resources/profile-image.png"
            sx={{ width: 110, height: 110 }}
          />
          <Box marginLeft="15px">
            <Typography variant="subtitle1" sx={{ color: "#AEAEAE" }}>
              Current Owner
            </Typography>
            <Typography variant="h5">@SeltradeX</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
