import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux/";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../firebase/Auth";
import { getItemCount } from "../util";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, signOut } = useAuth();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const navigate = useNavigate();
  const userName = user?.email.substring(0, user?.email.lastIndexOf("@"));

  function navigateToCart() {
    navigate("/cart");
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      <AppBar position="sticky" sx={{ py: 1, boxShadow: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            gap: 4,
            width: "100%",
            maxWidth: "1920px",
            margin: "0px auto",
            justifyContent: "space-around",
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              "@media (max-width: 768px)": {
                marginRight: "auto",
              },
            }}
          >
            <StyledLink to="/">Shopz</StyledLink>
          </Typography>

          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="shopping cart"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartSharpIcon />
              </Badge>
            </IconButton>
            <Box>
              {user ? (
                <Button onClick={handleProfileMenuOpen} color="inherit">
                  Hello, {user.displayName ?? userName}
                </Button>
              ) : (
                <Button onClick={handleLogin} color="inherit">
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        signOut={signOut}
      />
    </>
  );
}

const SearchWrapper = styled("section")(() => ({
  width: "100%",
  flexBasis: "900px",
  "@media (max-width: 768px)": {
    display: "none",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));
