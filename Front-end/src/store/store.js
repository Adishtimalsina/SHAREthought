import { configureStore } from "@reduxjs/toolkit";
import thoughtSlice from "../features/thoughts/authSlice";

export const store = configureStore({
  reducer: thoughtSlice,
});
