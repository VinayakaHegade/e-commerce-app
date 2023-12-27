import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import AppBar from "@mui/material/AppBar";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { fetchAllCategories } from "../feature/categories-slice";
import { useAuth } from "../firebase/Auth";
import { getItemCount } from "../util";

const SearchWrapper = styled("section")(() => ({
  width: "100%",
  flexBasis: "900px",
  "@media (max-width: 768px)": {
    display: "none",
  },
}));

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& >MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
    marginRight: `calc(1em + ${theme.spacing(3)})`,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
  "& .MuiAutocomplete-clearIndicator": {
    fontSize: "larger",
    marginRight: `calc(1em + ${theme.spacing(2)})`,
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

export function SearchBar() {
  const products = useSelector((state) => state?.products?.value);
  const categories = useSelector((state) => state?.categories?.value);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchAllCategories());
    }
  }, []);

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);

  function handleCategoryChange(event) {
    const { value } = event.target;
    navigate(
      value === "all"
        ? "/"
        : `/?category=${value}${searchTerm ? "&searchTerm=" + searchTerm : ""}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchterm=${searchText}`
          : `/?category=${selectedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
  }

  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard, .MuiSelect-icon": {
              color: "common.white",
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem value="all" sx={{ textTransform: "capitalize" }}>
          all
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            key={category}
            value={category}
            sx={{ textTransform: "capitalize" }}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyleAutocomplete
        freeSolo
        id="selected-product"
        onChange={(e, value) => {
          handleSearchChange(value?.label);
        }}
        disablePortal
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter((prod) => prod.category == selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

export default function Header() {
  const { user, signOut } = useAuth();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const navigate = useNavigate();
  const userName = user?.email.substring(0, user?.email.lastIndexOf("@"));
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function navigateToCart() {
    navigate("/cart");
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogin() {
    navigate("/login");
  }

  async function logout() {
    await signOut();
    navigate("/login");
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ py: 1, boxShadow:"none" }}>
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
      {renderMenu}
    </>
  );
}
