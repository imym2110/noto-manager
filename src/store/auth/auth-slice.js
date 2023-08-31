import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    auth: {
      user: null,
    },
  },
  reducers: {
    setUser(currentSlice, action) {
      currentSlice.auth.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;
