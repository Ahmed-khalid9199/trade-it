import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      return [...state, ...action.payload];
    },
    setFilteredProducts(state, action) {
      return [...action.payload];
    },
  },
});
export const productsActions = productsSlice.actions;
export default productsSlice;
