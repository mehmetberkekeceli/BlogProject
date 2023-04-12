import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "./store";

const userCookie = Cookies.get("user");
const initialUser = userCookie ? JSON.parse(userCookie) : null;

export interface AuthState {
  user: string | null;
}

const initialState: AuthState = {
  user: initialUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      Cookies.set("user", action.payload);
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectUser = (state: RootState) => state.auth.user;
