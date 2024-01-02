import Coupon from "../Models/Coupon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface CouponState{
    value: Coupon[]
}

const initState: CouponState = {
    value: []
}

export const couponSlice = createSlice( {
    name: "coupons",
    initialState: initState,
    reducers: {
        fetch: (state, action: PayloadAction<Coupon[]>) =>{
                state.value = action.payload;
        },
        add: (state, action: PayloadAction<Coupon>) =>{
            state.value.push(action.payload);
        },
        update:(state, action: PayloadAction<Coupon>)=>{
            const indexToUpdate =state.value.findIndex( c => c.id == action.payload.id)
            if (indexToUpdate >=0)
                state.value[indexToUpdate] = action.payload;
        },
        remove:(state, action: PayloadAction<number>) =>{
            const indexToDelete = state.value.findIndex( c => c.id == action.payload);
            if (indexToDelete >= 0)
                state.value.splice(indexToDelete, 1);
        }
    }

})


export const{fetch, add, update, remove} = couponSlice.actions;
export default couponSlice.reducer;