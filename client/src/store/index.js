import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import productsSlice from "./products";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
  },
});
export default store;
