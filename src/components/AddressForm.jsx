import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../feature/checkout-slice";

export default function AddressForm() {
  const address = useSelector((state) => state.checkout?.address);
  const dispatch = useDispatch();

  function handleAddressChange(event) {
    const { name, value } = event.target;
    dispatch(updateAddress({ [name]: value }));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Box component={"form"} onChange={handleAddressChange}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              variant="standard"
              fullWidth
              autoComplete="given-name"
              defaultValue={address.firstName ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="standard"
              fullWidth
              autoComplete="family-name"
              defaultValue={address.lastName ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine1"
              name="addressLine1"
              label="Address Line1"
              variant="standard"
              fullWidth
              defaultValue={address.addressLine1 ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine2"
              name="addressLine2"
              label="Address Line2"
              variant="standard"
              fullWidth
              defaultValue={address.addressLine2 ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              variant="standard"
              fullWidth
              defaultValue={address.city ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="Zip/Postal Code"
              variant="standard"
              fullWidth
              defaultValue={address.zipCode ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              variant="standard"
              fullWidth
              defaultValue={address.country ?? ""}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
