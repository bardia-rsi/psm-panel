import type { Dictionary } from "@/types/Types";
import type { Error } from "@/types/App/Error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { asyncThunkEntityPayloadCreator } from "@/helpers/thunk";
import { dataApi } from "@/api";
import { trim } from "@/utils/url";

export const set = <T, R>(name: string, basePath: string) =>
    createAsyncThunk<Dictionary<T>, undefined, { rejectValue: Error }>(
        `entities/${name}/set`,
        asyncThunkEntityPayloadCreator<T, R>(name, async (_, name) => {
            return await dataApi.get(`/${trim(basePath)}/${name}`);
        })
    );