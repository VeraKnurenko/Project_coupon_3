import Customer from "../Models/Customer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";

export interface PurchaseState{
    value: number[]
}

const initState: PurchaseState = {

    value: localStorage.getItem("purchased") ? JSON.parse(localStorage.getItem("purchased")) : []
}

export const purchaseSlice = createSlice({
    name: "purchases",
    initialState: initState,
    reducers: {
        fetch: (state, action: PayloadAction<Coupon[]>) =>{
            let couponIds = action.payload;
            state.value = couponIds.map(c => c.id);
             localStorage.setItem("purchased", JSON.stringify(state.value));
        },
        add: (state, action: PayloadAction<number>)=>{
            state.value.push(action.payload);
            localStorage.setItem("purchased", JSON.stringify(state.value));
        },

        clear: (state)=>{
            state.value = [];
            }
        }

})

export const {fetch, add, clear} = purchaseSlice.actions;
export default purchaseSlice.reducer;