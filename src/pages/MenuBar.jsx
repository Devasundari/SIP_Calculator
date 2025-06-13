import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth } from "firebase/auth";
import { useUser } from "../context/AuthContext";

const pages = [
  { name: "Home", path: "/" },
  { name: "SIP Calculator", path: "/sip-calculator" },
  { name: "About", path: "/about" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MenuAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Firebase Authentication
  const auth = getAuth();
  const user = auth.currentUser; // Get the current user

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login"); // Redirect to login after logout
      })
      .catch((error) => {
        toast.error("Error logging out: " + error.message);
      });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleNavigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            CalcMySip.com
          </Typography>

          {/* MOBILE MENU BUTTON */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleNavigate(page.path);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleNavigate("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            CalcMySip.com
          </Typography>

          {/* DESKTOP NAVIGATION BUTTONS */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 3,
              marginLeft: "250px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                sx={{ color: "white" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* USER MENU */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.email || "User"}>
              <Avatar
                alt={user?.email}
                src={user?.photoURL || ""}
                sx={{
                  bgcolor: user?.photoURL ? "transparent" : deepPurple[500],
                  color: "white",
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                  cursor: "default",
                }}
              >
                {!user?.photoURL &&
                  (
                    user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "?"
                  ).toUpperCase()}
              </Avatar>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuAppBar;
