import type { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { Schema } from "normalizr";
import type { Error } from "@/types/App/Error";
import type { Company } from "@/types/Data/Entities/Company";
import type { Dictionary } from "@/types/Types";
import { kebabCase } from "lodash";
import { normalize } from "normalizr";
import { entity } from "@/app/schemas/entity";
import { softSet as setCompanies } from "@/app/slices/entities/companies";

interface NormalizerConfig {
    schema: Schema;
}

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

export const asyncThunkEntityPayloadCreator = <T, R, A = undefined, E extends Error = Error>
(
    name: string,
    callback: (args: A, name: string) => Promise<AxiosResponse<R, any>>,
    normalizerConfig: NormalizerConfig = { schema: entity }
): AsyncThunkPayloadCreator<Dictionary<T>, A, { rejectValue: E }> => async (
    args,
    { rejectWithValue, dispatch }
) => {
    try {

        const res = await callback(args, kebabCase(name).toLowerCase());

        let data: R | R[] = res.data;

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (data.length < 1) {
            return {} as Dictionary<T>;
        }

        const normalizedData = normalize(data, [normalizerConfig.schema]).entities;

        if (normalizedData.companies) {
            dispatch(setCompanies(normalizedData.companies as Dictionary<Company>));
        }

        return normalizedData.entities as Dictionary<T>;

    } catch (e: any) {

        return rejectWithValue({
            code: Number(e.response.status) || 500,
            message: e.response.statusText || "Internal Error",
            occurrenceTime: Date.now()
        } as E);

    }
}