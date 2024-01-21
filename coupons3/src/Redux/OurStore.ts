import {configureStore} from "@reduxjs/toolkit";
import {couponSlice} from "./CouponSlice";
import {authSlice} from "./AuthSlice";
import {companySlice} from "./CompanySlice";
import {customerSlice} from "./CustomerSlice";

export const store = configureStore({
    reducer: couponSlice.reducer

});

export  const authStore = configureStore({
    reducer: authSlice.reducer
});

export const companyStore = configureStore({
    reducer: companySlice.reducer
})

export const customerStore = configureStore({
    reducer: customerSlice.reducer
})

export const couponStore = configureStore({
    reducer: couponSlice.reducer
})

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch