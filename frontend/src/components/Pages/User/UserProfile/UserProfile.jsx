import React from "react";
import {
  Box,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserProfile() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box
            margin="auto"
            width="90%"
            sx={{ flexGrow: 0, position: "relative" }}
          >
            <img
              src="resources/profile-banner.png"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />

            <IconButton
              sx={{
                padding: 0,
                position: "absolute",
                bottom: "-30px",
                left: "30px",
                zIndex: 1,
                "&:hover": {
                  "& .edit-icon": {
                    display: "initial",
                  },
                },
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/resources/profile-image.png"
                sx={{ width: 110, height: 110 }}
              />
              <EditIcon
                className="edit-icon"
                fontSize="large"
                sx={{
                  display: "none",
                  position: "absolute",
                  color: "#FFFFFF",
                }}
              />
            </IconButton>
          </Box>

          <Grid item xs={6} md={6}>
            <Typography variant="h5">Username: YourUsername</Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed vitae justo auctor, dignissim purus at, ultricies dolor.
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button variant="outlined" color="primary">
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
