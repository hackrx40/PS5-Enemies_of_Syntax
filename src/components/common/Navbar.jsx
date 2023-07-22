import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { BsBell } from "react-icons/bs";
import { FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;
  const currentTheme = theme.palette.mode;

  const [counter, setCounter] = useState(0);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "hi,en,bn,fr,mr",
        layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    if (counter === 1) {
      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
      setCounter(2);
    }
    setCounter(1);
  }, [counter]);

  return path === "/login" || path === "/signup" || path === "/otp" ? null : (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              ></IconButton>
            </Tooltip>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                variant="h5"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Welcome to Finance<span style={{ color: "#FDC448", fontWeight: "bold" }}>Guru </span>by Bajaj
              </Typography>
            </Link>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <div id="google_translate_element"></div>
            <Tooltip title="Toggle Theme" arrow>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ fontSize: "20px", color: "text.primary" }}
              >
                {currentTheme === "light" ? <FiMoon /> : <FiSun />}
              </IconButton>
            </Tooltip>

            {/* <ProfileMenu /> */}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
