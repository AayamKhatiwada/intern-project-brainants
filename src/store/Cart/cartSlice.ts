import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../Home/Items";
import {
  AddCurrentCart,
  DeleteCurrentCart,
  UpdateCurrentCart,
} from "../../firebase";

export interface CartStateInterface {
  uid: string | undefined;
  name: string | undefined;
  email: string | undefined;
  cart: CartItemNumber[];
}

export interface CartItemNumber {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  number: number;
}

const initialState: CartStateInterface = {
  uid: undefined,
  name: undefined,
  email: undefined,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state: CartStateInterface,
      action: PayloadAction<CartStateInterface | null>
    ) => {
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.uid = action.payload?.uid;
      state.cart = action.payload ? action.payload.cart : [];
    },
    addCart: (state: CartStateInterface, action: PayloadAction<CartItem>) => {
      let found = false;
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload.name) {
          found = true;
          cartItem.number++;
        }
        return 0;
      });

      if (!found) {
        state.cart.push({ ...action.payload, number: 1 });
      }
      AddCurrentCart(state, state.uid);
    },
    increaseCount: (
      state: CartStateInterface,
      action: PayloadAction<string>
    ) => {
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload) {
          cartItem.number++;
        }
        return 0;
      });
      UpdateCurrentCart(state, state.uid);
    },
    decreaseCount: (
      state: CartStateInterface,
      action: PayloadAction<string>
    ) => {
      state.cart.map((cartItem, index) => {
        if (cartItem.name === action.payload) {
          if (cartItem.number >= 2) {
            cartItem.number--;
          } else if (cartItem.number === 1) {
            state.cart.splice(index, 1);
          }
        }
        return 0;
      });
      UpdateCurrentCart(state, state.uid);
    },
    removeItemFromCart: (
      state: CartStateInterface,
      action: PayloadAction<string>
    ) => {
      // state.cart.filter((cartItem) => {
      //   console.log(cartItem.name !== action.payload);
      //   return cartItem.name !== action.payload;
      // });
      state.cart.forEach((cartItem, index) => {
        if (cartItem.name === action.payload) {
          state.cart.splice(index, 1);
          return;
        }
      });
      UpdateCurrentCart(state, state.uid);
    },
    clearCart: (state: CartStateInterface) => {
      state.cart = [];
      DeleteCurrentCart(state.uid);
    },
    setName: (
      state: CartStateInterface,
      action: PayloadAction<string | undefined>
    ) => {
      state.name = action.payload;
      UpdateCurrentCart(state, state.uid);
    },
    setEmail: (
      state: CartStateInterface,
      action: PayloadAction<string | undefined>
    ) => {
      state.email = action.payload;
      UpdateCurrentCart(state, state.uid);
    },
    setUid: (
      state: CartStateInterface,
      action: PayloadAction<string | undefined>
    ) => {
      state.uid = action.payload;
      UpdateCurrentCart(state, state.uid);
    },
  },
});

export default cartSlice.reducer;

export const {
  setCart,
  addCart,
  setName,
  setEmail,
  setUid,
  increaseCount,
  decreaseCount,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
