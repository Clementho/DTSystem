import React from "react";
import {Box,  Grid,  TextField,  Avatar,IconButton,Divider,Typography, Button,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserProfile() {
  return (
    <div>
      <Box margin="auto" width="90%" sx={{ flexGrow: 0, position: "relative" }}>
        <img
          src="resources/profile-banner.png"
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "-30px",
            left: "30px", // Change left to right
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginRight: 10, order: 2 }}>
            <Button
              variant="contained"
              sx={{
                color: "#FFFFFF",
              }}
            >
              Edit Profile
            </Button>
          </Box>
          <Avatar
            alt="Remy Sharp"
            src="/resources/profile-image.png"
            sx={{ width: "25%", height: "", order: 1 }}
          />
          <IconButton
            sx={{
              padding: 0,
              order: 3,
              "&:hover": {
                ".edit-icon": {
                  display: "initial",
                },
              },
            }}
          >
            <EditIcon
              className="edit-icon"
              fontSize="large"
              sx={{
                display: "none",
                color: "#FFFFFF",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box mt={3}>
        <TextField
          label="Your Text"
          variant="outlined"
          fullWidth
        />
      </Box>
    </div>
  );
}
