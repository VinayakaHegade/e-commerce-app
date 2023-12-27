import { InputAdornment, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function valuetext(value) {
  return `$${value}`;
}

const PriceFilter = () => {
  const [value, setValue] = useState([0, 630]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMinimumInputChange = (event) => {
    setValue((prev) =>
      event.target.value === ""
        ? [0, prev[1]]
        : [Number(event.target.value), prev[1]]
    );
  };

  const handleMaximumInputChange = (event) => {
    setValue((prev) =>
      event.target.value === ""
        ? [prev[0], 0]
        : [prev[0], Number(event.target.value)]
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "16px 32px 48px",
        "@media (max-width: 768px)": {
          top: "56px",
        },
      }}
    >
      <Typography variant="h5">Filter By Price</Typography>
      <Box
        sx={{
          mt: "16px",
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Slider
          max={1000}
          step={200}
          marks
          size="small"
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{ maxWidth: 600 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            value={value[0]}
            label="Minimum"
            size="small"
            variant="outlined"
            onChange={handleMinimumInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            value={value[1]}
            label="Maximum"
            size="small"
            variant="outlined"
            onChange={handleMaximumInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PriceFilter;
