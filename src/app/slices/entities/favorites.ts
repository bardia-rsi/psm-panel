import type { PayloadAction } from "@reduxjs/toolkit";
import type { EntityState } from "@/types/App/States";
import type { EntityItemWithType, StoreEntityItemWithType } from "@/types/Data/Entities/Entity";
import type { PIDR } from "@/types/Data/Base";
import { createSlice } from "@reduxjs/toolkit";
import { omit } from "lodash";
import { set as setThunkAction } from "@/app/actions/entities";
import { changeOrderReducer, changeSortByReducer } from "@/app/common/caseReducers";
import { setLoadingStatus, setDictionaryData, setFailedStatus } from "@/app/common/extraReducers";

type State = EntityState<StoreEntityItemWithType, "favorite">;

const set = setThunkAction<StoreEntityItemWithType, EntityItemWithType>("favorites", "data");

const slice = createSlice({
    name: "entities/favorites",
    initialState: { items: {}, status: "idle", errors: {}, sortBy: "favorite", order: "asc" } as State,
    reducers: {
        add: (state, action: PayloadAction<StoreEntityItemWithType>) => {

            state.items[action.payload.pid] = action.payload;

            return state;

        },
        remove: (state, action: PayloadAction<PIDR>) => {

            state.items = omit(state.items, action.payload);

            return state;

        },
        "sortBy/change": changeSortByReducer<"favorite">,
        "order/change": changeOrderReducer,
    },
    extraReducers: builder => {
        builder
            .addCase(set.pending, setLoadingStatus<State>)
            .addCase(set.fulfilled, setDictionaryData<StoreEntityItemWithType, State>())
            .addCase(set.rejected, setFailedStatus<State>)
    }
});

export { set };

export const {
    add,
    remove,
    "order/change": changeOrder,
    "sortBy/change": changeSortBy
} = slice.actions;

export default slice.reducer;