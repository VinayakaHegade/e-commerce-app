import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getSubtotal } from "../util";
import { useTheme } from "@mui/material";

export default function ReviewForm() {
  const cart = useSelector((state) => state.cart?.value);
  const address = useSelector((state) => state.checkout?.address);
  const addresses = address ? Object.values(address) : [];
  const payment = useSelector((state) => state.checkout?.payment);
  const payments = payment
    ? [
        {
          name: "Card Type",
          detail: "Visa",
        },
        {
          name: "Card Number",
          detail: payment.cardNumber,
        },
        {
          name: "Card Holder",
          detail: payment.name,
        },
        {
          name: "Expiry Date",
          detail: payment.expDate,
        },
      ]
    : [];
  const theme = useTheme();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cart?.map(({ product, quantity }) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: 500,
                },
                "& .MuiListItemText-secondary": {
                  fontSize: theme.spacing(2),
                },
              }}
              primary={product.title}
              secondary={`Qty: ${quantity}`}
            />
            <Typography variant="body2">
              ${getSubtotal([{ product, quantity }])?.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Total"
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: 700,
              },
            }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${getSubtotal(cart).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} sx={{ mt: 1.5 }}>
        <Grid item xs={12} sm={6} sx={{ mr: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography>{addresses.join(",")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Grid container>
            {payments.map(({ name, detail }) => (
              <>
                <Grid key={name} item xs={6}>
                  <Typography gutterBottom>{name}</Typography>
                </Grid>
                <Grid key={detail} item xs={6}>
                  <Typography gutterBottom>{detail}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
