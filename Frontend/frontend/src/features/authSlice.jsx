import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    user: null,
    authToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        updateAuthToken:(state, action)=> {
            state.authToken = action.payload
        },
        updateUser:(state, action)=> {
            state.user = action.payload
        }
    }

})

export default authSlice.reducer
export const { updateAuthToken, updateUser } = authSlice.actions