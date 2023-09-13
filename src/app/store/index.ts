import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
    devTools: true
});

export type State = ReturnType<typeof store.getState>;

export type GetState = () => State;

export type AppDispatch = typeof store.dispatch;