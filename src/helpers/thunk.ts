import type { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { Error } from "@/types/App/Error";

export const asyncThunkPayloadCreator = <T, A = undefined, E extends Error = Error>(
    callback: (args: A) => Promise<AxiosResponse<T, any>>
): AsyncThunkPayloadCreator<T, A, { rejectValue: E }> => async (args, { rejectWithValue }) => {
    try {
        return (await callback(args)).data;
    } catch (e: any) {
        return rejectWithValue({
            code: Number(e.response.status) || 500,
            message: e.response.statusText || "Internal Error",
            occurrenceTime: Date.now()
        } as E);
    }
}