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
          cartItem.number++;
          found = true;
        }
      });
      if (!found) {
        state.cart.push({ ...action.payload, number: 1 });
      }
    },
    increaseCount: (state: CartStateInterface, action: PayloadAction<string>) => {
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload) {
          cartItem.number++;
        }
      });
    },
    decreaseCount: (state: CartStateInterface, action: PayloadAction<string>) => {
      state.cart.map((cartItem) => {
        if (cartItem.name === action.payload) {
          cartItem.number--;
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

export const { addCart, setName, setEmail } = cartSlice.actions;
