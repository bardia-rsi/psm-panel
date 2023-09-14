import { configureStore } from "@reduxjs/toolkit";
import reducers from "@/app/reducers";

export const store = configureStore({
    reducer: reducers,
    devTools: true
});

export type State = ReturnType<typeof store.getState>;

export type GetState = () => State;

export type AppDispatch = typeof store.dispatch;