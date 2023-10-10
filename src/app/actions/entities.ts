import type { Dictionary } from "@/types/Types";
import type { Error } from "@/types/App/Error";
import type { PIDR, BaseEntityMeta } from "@/types/Data/Base";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { kebabCase } from "lodash";
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

export const create = <T, R, C extends Dictionary>(name: string, basePath: string) =>
    createAsyncThunk<Dictionary<T>, C, { rejectValue: Error }>(
        `entities/${name}/create`,
        asyncThunkEntityPayloadCreator<T, R, C>(name, async (body, name) => {
            return await dataApi.post(`/${trim(basePath)}/${name}`, body);
        })
    );

export const update = <T, R, U extends RequiredKeys<Partial<BaseEntityMeta>, "pid">>(name: string, basePath: string) =>
    createAsyncThunk<Dictionary<T>, U, { rejectValue: Error }>(
        `entities/${name}/update`,
        asyncThunkEntityPayloadCreator<T, R, U>(name, async ({ pid, ...body } , name) => {
            return await dataApi.put(
                `/${trim(basePath)}/${name}/${pid}`,
                body
            );
        })
    );

export const remove = (name: string, basePath: string) => createAsyncThunk<PIDR, PIDR, { rejectValue: Error }>(
    `entities/${name}/remove`,
    async (pid, { rejectWithValue }) => {
        try {

            await dataApi.delete(
                `/${trim(basePath)}/${kebabCase(name).toLowerCase()}/${pid}`
            );

            return pid;

        } catch (e: any) {
            return rejectWithValue({
                code: Number(e.response.status) || 500,
                message: e.response.statusText || "Internal Error",
                occurrenceTime: Date.now()
            });
        }
    }
);