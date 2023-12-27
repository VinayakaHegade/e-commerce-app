import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileSearch from "./MobileSearch";
import PriceFilter from "./PriceFilter";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <MobileSearch />
      <PriceFilter />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}
