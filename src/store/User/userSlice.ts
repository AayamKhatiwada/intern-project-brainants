import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserStateInterface {
  user: UserInterface | null | undefined;
  loading: boolean;
}

interface UserInterface {
  displayName: string;
  email: string;
  uid: string;
  image: string | null;
}

const initialState: UserStateInterface = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (
      state: UserStateInterface,
      action: PayloadAction<UserInterface | null>
    ) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    isLoading: (state: UserStateInterface, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { addUser, removeUser, isLoading } = userSlice.actions;
