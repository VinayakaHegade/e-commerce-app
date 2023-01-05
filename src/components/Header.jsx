import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useSelector } from "react-redux";
import { getItemCount } from "../util";
import { alpha } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

function SearchBar() {
  const products = useSelector((state) => state.products.value);
  return (
    <Search>
      <Select
        size="small"
        sx={{
          m: 1,
          "&": {},
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
      >
        <MenuItem value="all">all</MenuItem>
      </Select>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Array.from(products, (prod) => ({
          id: prod.id,
          label: prod.title,
        }))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Search>
  );
}

export default function Header() {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          E-commerce
        </Typography>
        <SearchBar />
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton size="large" aria-label="shopping cart" color="inherit">
            <Badge badgeContent={count} color="error">
              <ShoppingCartSharpIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
