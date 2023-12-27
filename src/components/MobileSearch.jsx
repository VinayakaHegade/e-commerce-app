import { Box } from "@mui/material";
import { SearchBar } from "./Header";

const MobileSearch = () => {
  return (
    <Box
      sx={{
        zIndex: 99,
        position: "fixed",
        width: "100%",
        backgroundColor: "#1976d2",
        "@media (min-width: 769px)": {
          display: "none",
        },
      }}
    >
      <SearchBar />
    </Box>
  );
};

export default MobileSearch;
