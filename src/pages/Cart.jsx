import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { getSubtotal } from "../util";
import { setQuantity, removeFromCart } from "../feature/cart-slice";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const cart = useSelector((state) => state?.cart.value);
  const theme = useTheme();
  const subtotal = getSubtotal(cart)?.toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

function handleDecreaseQuantity(product, quantity) {
  if (quantity === 1) {
    dispatch(removeFromCart({ product }));
  } else {
    dispatch(setQuantity({ product, quantity: quantity - 1 }));
  }
}

function handleIncreaseQuantity(product, quantity) {
  dispatch(setQuantity({ product, quantity: quantity + 1 }));
}

  function goToCheckout() {
    navigate("/checkout");
  }

  function goToHome() {
    navigate("/");
  }

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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleDecreaseQuantity(product, quantity)
                          }
                        >
                          {quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                        </IconButton>
                        <Typography>{quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            handleIncreaseQuantity(product, quantity)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {"$" + getSubtotal([{ product, quantity }])?.toFixed(2)}
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
                <Button variant="contained" onClick={goToCheckout}>
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  Shop Products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
