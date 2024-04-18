import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import darkModeReducer from '../features/darkModeSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        darkMode: darkModeReducer,

    }
})