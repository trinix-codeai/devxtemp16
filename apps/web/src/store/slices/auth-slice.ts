"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearSession(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
