import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../feature/checkout-slice";

export default function PaymentsForm() {
  const payment = useSelector((state) => state.checkout?.payment);
  const dispatch = useDispatch();
  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(updatePayment({ [name]: value }));
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Box component="form" onChange={handleChange}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              id="name"
              variant="standard"
              required
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              defaultValue={payment.name ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="cardNumber"
              id="cardNumber"
              variant="standard"
              required
              label="Card Number"
              fullWidth
              autoComplete="cc-number"
              defaultValue={payment.cardNumber ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="expDate"
              id="expDate"
              variant="standard"
              required
              label="Expiry Date"
              fullWidth
              autoComplete="cc-exp"
              defaultValue={payment.expDate ?? ""}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="cvv"
              id="cvv"
              variant="standard"
              required
              label="CVV"
              type="password"
              fullWidth
              autoComplete="cc-csc"
              defaultValue={payment.cvv ?? ""}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
