import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addTocart(state, action) {
      console.log(action);
      state.value.push(action.payload);
    },
  },
});

export const { addTocart } = cartSlice.actions;

export default cartSlice.reducer;
