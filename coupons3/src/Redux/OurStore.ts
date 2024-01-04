import CouponSlice, {couponSlice} from "./CouponSlice";
import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const reducers = combineReducers({
    authSlice: AuthSlice,
    couponSlice: CouponSlice,
})

const store = createStore(reducers);
export default store;
  

// export const store = configureStore({
//     reducer: couponSlice.reducer
//    
// });

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch