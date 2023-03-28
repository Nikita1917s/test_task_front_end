import { combineReducers } from "redux";
import { productsApi } from "../api/products.api";
import { productsSlice } from "./products";

export const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer
});
