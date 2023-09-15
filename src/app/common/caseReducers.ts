import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import type { PIDI } from "@/types/Data/Base";
import type { PureState, StatePreferences, SortBy, Order } from "@/types/App/States";
import type { Dictionary } from "@/types/Types";

export const setDictionary = <T extends PIDI, S extends PureState<T> = PureState<T>>(
    state: Draft<S>,
    action: PayloadAction<Dictionary<T>>
): Draft<S> => {

    Object.keys(action.payload).forEach(key => {
        state.items[key] = action.payload[key] as Draft<T>;
    })

    return state;

}

export const changeSortByReducer = <S extends string = never>(
    state: Draft<{ sortBy: StatePreferences<S>["sortBy"] }>,
    action: PayloadAction<S extends string ? SortBy | S : SortBy>
) => {
    state.sortBy = action.payload as Draft<S extends string ? SortBy | S : SortBy>;
}

export const changeOrderReducer = (
    state: Draft<{ order: StatePreferences["order"] }>,
    action: PayloadAction<Order>
) => {
    state.order = action.payload;
}