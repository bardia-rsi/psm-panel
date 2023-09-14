import type { AsyncThunk } from "@reduxjs/toolkit";
import type { Error } from "@/types/App/Error";

type GenericAsyncThunk<T = unknown, A = unknown> = AsyncThunk<T, A, { rejectValue: Error }>;

export type RejectedAction<T = unknown, A = unknown> = ReturnType<GenericAsyncThunk<T, A>["rejected"]>;
export type FullFilledAction<T = unknown, A = unknown> = ReturnType<GenericAsyncThunk<T, A>["fulfilled"]>;