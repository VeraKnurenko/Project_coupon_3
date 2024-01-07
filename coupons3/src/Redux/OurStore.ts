import CouponSlice, {couponSlice} from "./CouponSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

// const reducers = combineReducers({
//     authSlice: AuthSlice,
//     couponSlice: CouponSlice,
// })


export const store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        couponSlice: CouponSlice,
    }

});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch