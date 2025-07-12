// first we configure our store 
// redux me jo bhi fxns we will use, unme mostly data is passed in form of objects

// configureStore fxn creates our store

// in store.js we store diff diff slices ka data

import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user.slice.js"
import messageSlice from "./message.slice.js"

export const store = configureStore({
    reducer: {
        user: userSlice,
        message: messageSlice
    }
})