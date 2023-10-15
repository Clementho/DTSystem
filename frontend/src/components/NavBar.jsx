import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SnackBar from "./SnackBar";
import { NavLink } from "react-router-dom";
import axios from "axios";

// Navigation Bar Component
// Adapted from https://mui.com/material-ui/react-app-bar/
import SearchBar from "./SearchBar";

const pages = ["Marketplace"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Snackbar states
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Function to fetch the user's balance
  const fetchUserBalance = async () => {
    try {
      const response = await axios.get("/api/user/getUserBalance/0x780B021bc49E53a475b9Bf2b0D8817008BfE0468");
      const roundedBalance = parseFloat(response.data.balance_eth).toFixed(2); // Round to 2 decimal places

      setWalletBalance(roundedBalance);
      
    } catch (error) {
      console.error("Error fetching user balance:", error);
      setWalletBalance(null);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", padding: "10px" }}
    >
      <SnackBar message={snackMessage} severity={snackSeverity} />

      <Container maxWidth="xl">
        <Toolbar disableGutters>

        {/* HAMBURGERISED NAV BAR */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "inherit", md: "none",},
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  {/* Routes to relevant page */}
                  <NavLink
                    to={"/" + page}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <NavLink to={"/"} 
            style={{ 
              textDecoration: "none",
              margin: "auto",
            }}>
            <img
              alt="logo"
              style={{ width: "108px", height: "54px" }}
              src="/resources/logo.png"
            />
          </NavLink>

          <SearchBar placeholder="Search..." setSnackMessage={setSnackMessage} setSnackSeverity={setSnackSeverity} />

          
          {/* NORMAL NAV BAR HERE - NON HAMBURGERISED NAVBAR */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <NavLink to={"/" + page} style={{ textDecoration: "none" }}>
                <Button
                  key={index}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "Space Mono",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    margin: "0px 10px",
                  }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ 
            flexGrow: 0, 
            display: "flex",
            alignItems: "center", 
            justifyContent: "space-between",
            borderRadius: "50px",
            padding: "7px 7px 7px 30px",
            bgcolor: "#401780",
          }}>
            <Typography sx={{
              fontSize: "1.4em",
              fontWeight: "bold",
              marginRight: "20px",
            }}>
              {walletBalance}
            </Typography>
            <Tooltip title="Profile">
              {/* Routes to user profile */}
              <NavLink to={"/User"} style={{ textDecoration: "none" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/resources/profile-image.png" sx={{ width: 56, height: 56 }}/>
                </IconButton>
              </NavLink>
            </Tooltip>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
