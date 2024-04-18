import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkmode: (state)=>{
            state.darkMode = !state.darkMode;
        }
    }
})

export default darkModeSlice.reducer
export const { toggleDarkmode } = darkModeSlice.actions