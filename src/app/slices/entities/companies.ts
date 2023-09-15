import type { Dictionary } from "@/types/Types";
import type { Company } from "@/types/Data/Entities/Company";
import type { Error } from "@/types/App/Error";
import type { PureState, StatePreferences } from "@/types/App/States";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataApi } from "@/api";
import { setLoadingStatus, setFailedStatus } from "@/app/common/extraReducers";
import { setDictionary } from "@/app/common/caseReducers";

const set = createAsyncThunk<Dictionary<Company>, undefined, { rejectValue: Error }>(
    "entities/companies/set",
    async (_, { rejectWithValue }) => {
        try {

            const res = await dataApi.get<Company[]>("/data/companies");

            return Object.fromEntries(res.data.map(r => ([r.pid, r])));

        } catch (e: any) {

            return rejectWithValue({
                code: Number(e.response.status) || 500,
                message: e.response.statusText || "Internal Error",
                occurrenceTime: Date.now()
            });

        }
    });

type State = PureState<Company> & Omit<StatePreferences, "sortBy" | "order">;

const slice = createSlice({
    name: "entities/companies",
    initialState: { items: {}, status: "idle", errors: {} } as State,
    reducers: {
        "set/soft": setDictionary<Company, State>
    },
    extraReducers: builder => {
        builder
            .addCase(set.pending.type, setLoadingStatus<State>)
            .addCase(set.rejected.type, setFailedStatus<State>)
            .addCase(set.fulfilled.type, setDictionary<Company, State>)
    }
});

export const {
    "set/soft": softSet
} = slice.actions;

export { set };

export default slice.reducer;