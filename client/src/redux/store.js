// configureStore fxn creates our store
import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user.slice.js"
// import messageSlice from "./messageSlice"
export const store = configureStore({
    reducer: {
        user: userSlice,
        // message: messageSlice
    }
})