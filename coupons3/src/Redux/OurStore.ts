import {configureStore} from "@reduxjs/toolkit";
import {couponSlice} from "./CouponSlice";
import {authSlice} from "./AuthSlice";

export const store = configureStore({
    reducer: couponSlice.reducer

});

export  const authStore = configureStore({
    reducer: authSlice.reducer
});

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch