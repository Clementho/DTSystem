import * as React from "react";
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
import { NavLink } from "react-router-dom";

// Navigation Bar Component
// Adapted from https://mui.com/material-ui/react-app-bar/
import SearchBar from "./SearchBar";

const pages = ["Marketplace"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", padding: "10px" }}
    >
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

          <SearchBar placeholder="Search..." />

          
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              {/* Routes to user profile */}
              <NavLink to={"/User"} style={{ textDecoration: "none" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/resources/profile-image.png" />
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
