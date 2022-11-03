import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (curryGetDefaultMiddleware ) => curryGetDefaultMiddleware({
        serializableCheck: false
    })
})