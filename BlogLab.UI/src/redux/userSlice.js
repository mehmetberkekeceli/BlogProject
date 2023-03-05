import { createSlice  } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            Cookies.set('user', action.payload)
            state.user = action.payload
        }
    }
})

export const { login } = authSlice.actions;
export default authSlice.reducer;


// Selector 
export const selectUser = (state) => state.auth.user


