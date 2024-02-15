import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Customer from "../Models/Customer";

export interface CustomerState{
    value: Customer[]
}

const initState: CustomerState = {
    value: [],
}

export const customerSlice = createSlice({
    name: "customers",
    initialState: initState,
    reducers: {
        fetch: (state, action: PayloadAction<Customer[]>) =>{
            state.value = action.payload;
        },
        add: (state, action: PayloadAction<Customer>)=>{
            state.value.push(action.payload);
        },
        update:(state, action:PayloadAction<Customer>)=>{
            const indexToUpdate: number = state.value.findIndex(c => c.id == action.payload.id)
            if (indexToUpdate >= 0){
                state.value[indexToUpdate] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>)=>{
            const indexToDelete: number = state.value.findIndex(c => c.id == action.payload)
            if (indexToDelete >= 0){
                state.value.splice(indexToDelete, 1);
            }
        }
    }
})

export const {fetch, add, update, remove} = customerSlice.actions;
export default customerSlice.reducer;