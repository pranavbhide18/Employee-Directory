import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentEmployee : null,
    error: null,
    loading: false
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {

        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signInSuccess : (state, action) => {
            state.currentEmployee = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        signOutSuccess : (state) => {
            state.currentEmployee = null;
            state.loading = false;
            state.error = null;
        },

        updateProfileSuccess: (state, action) => {
             state.currentEmployee = {
                ...state.currentEmployee,
                username: action.payload,
            };
            state.loading = false;
            state.error = null
        }
        

    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    updateProfileSuccess

} = employeeSlice.actions;

export default employeeSlice.reducer;