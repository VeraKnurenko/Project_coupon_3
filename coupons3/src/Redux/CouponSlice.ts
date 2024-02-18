import Coupon from "../Models/Coupon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface CouponState{
    value: Coupon[]
    // lastUpdated: Date
}

const initState: CouponState = {
    value: [],
    // lastUpdated: new Date()
}

export const couponSlice = createSlice( {
    name: "coupons",
    initialState: initState,
    reducers: {
        fetch: (state, action: PayloadAction<Coupon[]>) =>{
                state.value = action.payload;
                // state.lastUpdated = new Date();
        },
        add: (state, action: PayloadAction<Coupon>) =>{
            state.value.push(action.payload);
            // state.lastUpdated = new Date();
        },
        update:(state, action: PayloadAction<Coupon>)=>{
            const indexToUpdate =state.value.findIndex( c => c.id == action.payload.id)
            if (indexToUpdate >=0) {
                state.value[indexToUpdate] = action.payload;
                // state.lastUpdated = new Date();
            }

        },
        remove:(state, action: PayloadAction<number>) =>{
            const indexToDelete = state.value.findIndex( c => c.id == action.payload);
            if (indexToDelete >= 0)
                state.value.splice(indexToDelete, 1);
        },
        clear: (state) =>{
            state.value = [];
        }
    }

})


export const{fetch, add, update, remove,clear} = couponSlice.actions;
export default couponSlice.reducer;