import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

// Adapted from https://gist.github.com/SahanAmarsha/c36b57572679ae0ab8e9773b70120ed4

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#190029",
          paddingTop: "1rem",
          marginTop: "5%",
          paddingBottom: "1rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <img
                  alt="logo"
                  style={{ width: "108px", height: "54px" }}
                  src="/resources/logo.png"
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                />
              </NavLink>
            </Grid>
            <Grid item xs={12}>
              <Typography color="white" variant="p">
                {`| ${new Date().getFullYear()} |`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
