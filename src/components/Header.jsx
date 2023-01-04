import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useSelector } from "react-redux";
import { getItemCount } from "../util";

export default function Header() {
   const cartItems = useSelector((state) => state.cart?.value);
   const count = getItemCount(cartItems);
   console.log(count)
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          E-commerce
        </Typography>
        <Box sx={{display:{ md:"flex" }}}>
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
