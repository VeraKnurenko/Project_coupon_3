import CouponSlice, {couponSlice} from "./CouponSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: couponSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch