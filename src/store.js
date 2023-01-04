import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
