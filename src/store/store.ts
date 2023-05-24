import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateInterface } from "./User/userSlice";
import shopReducer, { ShopStateInterface } from "./Shop/shopSlice";
import cartReducer, { CartStateInterface } from "./Cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    cart: cartReducer,
  },
});

export interface RootInterface {
  user: UserStateInterface;
  shop: ShopStateInterface;
  cart: CartStateInterface;
}

export default store;
