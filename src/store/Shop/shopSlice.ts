import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Data, Items } from "../../firebase";

export interface ShopStateInterface {
  shop: Data[] | null | undefined;
  loading: boolean;
}

const initialState: ShopStateInterface = {
  shop: null,
  loading: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShop: (
      state: ShopStateInterface,
      action: PayloadAction<Data[] | null>
    ) => {
      state.shop = action.payload;
    },
    isLoading: (state: ShopStateInterface, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default shopSlice.reducer;

export const { addShop, isLoading } = shopSlice.actions;
