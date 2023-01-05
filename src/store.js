import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice";
import productsReducer from './feature/products-slice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer
  }
});
