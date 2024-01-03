import {User} from "../Models/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

export interface AuthState {
     user: User;
     token: string;
}

const initState: AuthState = {
    user: null,
    token: ""
}

export const authSlice = createSlice({
   name: "auth",
   initialState: initState,
   reducers:{
       login: (state, action:PayloadAction<string>) => {
           state.token = action.payload;
           state.user = jwtDecode(action.payload);
        },

       logout: (state) => {
           state.token = "";
           state.user = null;
       }
   }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;