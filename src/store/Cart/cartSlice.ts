import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../Home/Items";

export interface CartStateInterface {
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
  name: undefined,
  email: undefined,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state: CartStateInterface, action: PayloadAction<CartItem>) => {
      let found = false;
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload.name) {
          found = true;
          cartItem.number++;
        }
      });
      if (!found) {
        state.cart.push({ ...action.payload, number: 1 });
      }
    },
    increaseCount: (
      state: CartStateInterface,
      action: PayloadAction<string>
    ) => {
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload) {
          cartItem.number++;
        }
      });
    },
    decreaseCount: (
      state: CartStateInterface,
      action: PayloadAction<string>
    ) => {
      state.cart.map((cartItem, index) => {
        if (cartItem.name === action.payload) {
          if (cartItem.number > 2) {
            cartItem.number--;
          } else if (cartItem.number === 1) {
            state.cart.splice(index, 1);
          }
        }
      });
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
    },
    setName: (
      state: CartStateInterface,
      action: PayloadAction<string | undefined>
    ) => {
      state.name = action.payload;
    },
    setEmail: (
      state: CartStateInterface,
      action: PayloadAction<string | undefined>
    ) => {
      state.email = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const {
  addCart,
  setName,
  setEmail,
  increaseCount,
  decreaseCount,
  removeItemFromCart,
} = cartSlice.actions;
