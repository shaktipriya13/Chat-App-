// createSlice is a fxn in which we pass an object having many properties, we set name and initial state of slice
// we can make many states in this slice and set their iniital values
// for diff states we can make diff. reducer fxns to change their states

// reducers hv 2 params; state and action
// to get state value we use state, and to update its value we use action

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;//eg : we sent setUserDate("shakti")
        }
    }
})


// first we export all reducers
export const { setUserData } = userSlice.actions;//it means we can use setUserData in our components to update the state from userSlice to perform some action

// then we export all our slice reducers
export default userSlice.reducer;//it means we can use userSlice.reducer in our store to create the store