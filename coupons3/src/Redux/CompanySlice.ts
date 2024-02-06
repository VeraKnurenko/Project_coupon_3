import Company from "../Models/Company";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CompanyState{
    value: Company[]

}

const initState: CompanyState = {
    value: [],
}

export const companySlice = createSlice({
    name: "companies",
    initialState: initState,
    reducers: {
        fetch: (state, action: PayloadAction<Company[]>) =>{
            state.value = action.payload;
        },
        add: (state, action: PayloadAction<Company>)=>{
            state.value.push(action.payload);
        },
        update:(state, action:PayloadAction<Company>)=>{
            const indexToUpdate: number = state.value.findIndex(comp => comp.id === action.payload.id)
            if (indexToUpdate >= 0){
                state.value[indexToUpdate] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>)=>{
            const indexToDelete: number = state.value.findIndex(comp => comp.id === action.payload)
            if (indexToDelete >= 0){
                state.value.splice(indexToDelete, 1);
            }
        }
    }
})

export const {fetch, add, update, remove} = companySlice.actions;
export default companySlice.reducer;