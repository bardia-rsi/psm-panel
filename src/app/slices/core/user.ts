import type { StatePreferences } from "@/types/App/States";
import type { UserMeta, UserUpdatePayload } from "@/types/Data/Core/User";
import { PIDI, PIDR } from "@/types/Data/Base";
import { Error } from "@/types/App/Error";
import { dataApi } from "@/api";
import { asyncThunkPayloadCreator } from "@/helpers/thunk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoadingStatus, setFailedStatus } from "../../common/extraReducers";

interface State extends Omit<StatePreferences, "sortBy" | "order">{
    data: UserMeta;
}

export const set = createAsyncThunk<UserMeta, PIDR, { rejectValue: Error }>(
    `core/user/set`,
    asyncThunkPayloadCreator(async (pid) => {
        return await dataApi.get(`/data/users/${pid}`);
    })
);

export const update = createAsyncThunk<UserMeta, UserUpdatePayload & PIDI, { rejectValue: Error }>(
    `core/user/update`,
    asyncThunkPayloadCreator(async ({ pid, ...body }) => {
        return await dataApi.post(`/data/users/${pid}`, body);
    })
);

const slice = createSlice({
    name: "core/user",
    initialState: {} as State,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                action => [set.pending.type, update.pending.type].includes(action.type),
                setLoadingStatus<State>
            )
            .addMatcher(
                action => [set.fulfilled.type, update.fulfilled.type].includes(action.type),
                (state, action) => {

                    state.status = "succeeded";
                    state.data = action.payload;

                }
            )
            .addMatcher(
                action => [set.rejected.type, update.rejected.type].includes(action.type),
                setFailedStatus<State>
            )
    }
});

export default slice.reducer;