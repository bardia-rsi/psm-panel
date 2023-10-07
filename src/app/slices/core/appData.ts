import type { StatePreferences } from "@/types/App/States";
import type { AppData } from "@/types/Data/Core/AppData";
import type { Error } from "@/types/App/Error";
import type { DictionaryUnion } from "@/types/Types";
import type { EntityStates } from "@/types/App/DataTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { camelCase } from "lodash";
import { asyncThunkPayloadCreator } from "@/helpers/thunk";
import { dataApi } from "@/api";
import { setFailedStatus, setLoadingStatus } from "@/app/common/extraReducers";

type Lengths = DictionaryUnion<Exclude<EntityStates, "allItems"> | "all", number>;

export interface State extends Omit<StatePreferences, "sortBy" | "order"> {
    data: AppData;
}

const set = createAsyncThunk<AppData, undefined, { rejectValue: Error }>(
    `core/appData/set`,
    asyncThunkPayloadCreator(async () => {
        return await dataApi.get("/www/dashboard/settings");
    })
);

const setLengths = createAsyncThunk<Lengths, undefined, { rejectValue: Error }>(
    "core/appData/lengths/set",
    asyncThunkPayloadCreator(async () => {
        return await dataApi.get("/data/length");
    })
);

const slice = createSlice({
    name: "core/appData",
    initialState: { data: {}, status: "idle", errors: {} } as State,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(set.fulfilled, (state, action) => {

                state.status = "succeeded";
                state.data = action.payload;

            })
            .addCase(setLengths.fulfilled, (state, action) => {

                state.data.sidebar.sections = state.data.sidebar.sections.map(section => ({
                    ...section,
                    menu: section.menu.map(item => {

                        const key: string = camelCase(item.text.toLowerCase());

                        return {
                            ...item,
                            count: item.text.toLowerCase() === "all items"
                                ? action.payload.all
                                : key in action.payload
                                    ? action.payload[key as Exclude<EntityStates, "allItems">]
                                    : undefined
                        }

                    })
                }));

                return state;

            })
            .addMatcher(
                action => [set.pending, setLengths.pending].includes(action.type),
                setLoadingStatus<State>
            )
            .addMatcher(
                action => [set.rejected, setLengths.rejected].includes(action.type),
                setFailedStatus<State>
            )
    }
});

export { set, setLengths };

export default slice.reducer;