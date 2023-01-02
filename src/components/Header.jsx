import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          E-commerce
        </Typography>
        <Box sx={{display:{ md:"flex" }}}>
        <IconButton size="large" aria-label="shopping cart" color="inherit">
          <Badge badgeContent={1} color="error">
            <ShoppingCartSharpIcon />
          </Badge>
        </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
