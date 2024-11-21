import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import AuthForm from "../../AuthForm";
import app from "../../firebaseConfig"; // Import the initialized Firebase app

const SiteHeader = ({ darkMode, onThemeToggle }) => {
  const [user, setUser] = useState(null); // State for the logged-in user
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element
  const [loginOpen, setLoginOpen] = useState(false); // Dialog visibility state
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Trending", path: "/movies/trending" },
  ];

  // Handle menu selection
  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorEl(null);
  };

  // Open the menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setUser(auth.currentUser);
  };

  // Listen to the auth state changes (e.g., login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state whenever auth state changes
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [auth]);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            menuOptions.map((opt) => (
              <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                {opt.label}
              </Button>
            ))
          )}

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={onThemeToggle}
                color="default"
              />
            }
            label={darkMode ? "Dark Mode" : "Light Mode"}
            sx={{ marginLeft: "10px" }}
          />

          <Button
            variant="contained"
            color={user ? "secondary" : "primary"}
            onClick={user ? handleLogout : () => setLoginOpen(true)}
            sx={{ marginLeft: "10px" }}
          >
            {user ? "Logout" : "Login / Sign Up"}
          </Button>
        </Toolbar>
      </AppBar>

      {/* AuthForm Dialog */}
      <AuthForm open={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default SiteHeader;
