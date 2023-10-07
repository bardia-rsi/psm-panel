import type { StatePreferences } from "@/types/App/States";
import type { Error } from "@/types/App/Error";
import type { FullFilledAction } from "@/types/App/ThunkActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changeOrderReducer, changeSortByReducer } from "@/app/common/caseReducers";
import { setLoadingStatus, setFailedStatus } from "@/app/common/extraReducers";
import * as entitiesSlice from "@/app/slices/entities";

const set = createAsyncThunk<
    boolean, undefined, { rejectValue: Error }
>("entities/allItems/set", async (_, { dispatch, rejectWithValue }) => {
    try {

        await dispatch(entitiesSlice.favorites.set());
        await dispatch(entitiesSlice.contacts.set());
        await dispatch(entitiesSlice.logins.set());
        await dispatch(entitiesSlice.paymentCards.set());
        await dispatch(entitiesSlice.wifiPasswords.set());

        return true;

    } catch (e: any) {
        return rejectWithValue({
            code: Number(e.response.status) || 500,
            message: e.response.statusText || "Internal Error",
            occurrenceTime: Date.now()
        });
    }
});

const slice = createSlice({
    name: "entities/allItems",
    initialState: { status: "idle", errors: {}, sortBy: "createdAt", order: "asc" } as StatePreferences,
    reducers: {
        "sortBy/change": changeSortByReducer,
        "order/change": changeOrderReducer,
    },
    extraReducers: builder => {

        builder
            .addCase(set.pending.type, setLoadingStatus<StatePreferences>)
            .addCase(set.rejected.type, setFailedStatus<StatePreferences>)
            .addCase(set.fulfilled.type, (state, action: FullFilledAction<boolean, undefined>) => {

                if (action.payload) {
                    state.status = "succeeded";
                } else {
                    state.status = "failed";
                }

            });

    }
});

export { set };

export const {
    "order/change": changeOrder,
    "sortBy/change": changeSortBy
} = slice.actions;

export default slice.reducer;