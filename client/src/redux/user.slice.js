// userSlice me jo bhi user ke related data hoga whi store hoga 

// createSlice is a fxn in which we pass an object having many properties, we set name and initial state of slice
// we can make many states in this slice and set their iniital values
// for diff states we can make diff. reducer fxns to change their states

// reducers hv 2 params; state and action
// to get state value we use state, and to update its value we use action

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",//this is the name of slice
    initialState: {
        // initialState me we can make many states using commas
        userData: null,

    },
    reducers: {//reducer are fxns that change the value of declared states in initialState
        setUserData: (state, action) => {
            state.userData = action.payload;//eg : we sent setUserDate("shakti")
            // state ke through we access data stored in that state
        },
    }
})


// first we export all reducers
export const { setUserData } = userSlice.actions;//it means we can use setUserData in our components to update the state from userSlice to perform some action

// then we export all our slice reducers
export default userSlice.reducer;//it means we can use userSlice.reducer in our store to create the store