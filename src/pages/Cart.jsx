import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  Button,
  CardContent,
  Rating,
  TextField,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { getSubtotal } from "../util";

export default function Cart() {
  const cart = useSelector((state) => state?.cart.value);
  const theme = useTheme();
  const subtotal = getSubtotal(cart);
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h6">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{ width: theme.spacing(8) }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {"$" + getSubtotal([{ product, quantity }])}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                spacing: 2,
              }}
            >
              <Typography>Subtotal</Typography>
              <Typography>{"$" + subtotal}</Typography>
              {subtotal > 0 ? (
                <Button variant="contained">Buy Now</Button>
              ) : (
                <Button variant="contained">Shop Products</Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
