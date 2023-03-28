import { IProduct } from "../../models/IProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const PROD_ITEMS = "prod_items";
const CART_ITEMS = "cart_items";

//Use localStore as DB

export interface ProductsState {
  products: IProduct[];
  cart: IProduct[];
}

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem(PROD_ITEMS) || "[]"),
  cart: JSON.parse(localStorage.getItem(CART_ITEMS) || "[]"),
};

// Actual Slice
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsSetProducts(
      state,
      { payload }: PayloadAction<ProductsState["products"]>
    ) {
      state.products = payload;
      localStorage.setItem(PROD_ITEMS, JSON.stringify(state.products));
    },
    productsAddProducts(state, { payload }: PayloadAction<IProduct>) {
      state.products.unshift(payload);
      localStorage.setItem(PROD_ITEMS, JSON.stringify(state.products));
    },
    productsRemoveProducts(state, { payload }: PayloadAction<string>) {
      state.products = state.products.filter(({ id }) => id !== payload);
      state.cart = state.cart.filter(({ id }) => id !== payload);
      localStorage.setItem(PROD_ITEMS, JSON.stringify(state.products));
      localStorage.setItem(CART_ITEMS, JSON.stringify(state.cart));
    },
    productsAddCart(state, { payload }: PayloadAction<IProduct>) {
      state.cart.unshift(payload);
      localStorage.setItem(CART_ITEMS, JSON.stringify(state.cart));
    },
    productsRemoveCart(state, { payload }: PayloadAction<string>) {
      state.cart = state.cart.filter(({ id }) => id !== payload);
      localStorage.setItem(CART_ITEMS, JSON.stringify(state.cart));
    },
  },
});

const { productsSetProducts } = productsSlice.actions;
const { productsAddProducts } = productsSlice.actions;
const { productsRemoveProducts } = productsSlice.actions;
const { productsAddCart } = productsSlice.actions;
const { productsRemoveCart } = productsSlice.actions;

export const ProductsActions = {
  productsSetProducts,
  productsAddProducts,
  productsRemoveProducts,
  productsAddCart,
  productsRemoveCart,
};
