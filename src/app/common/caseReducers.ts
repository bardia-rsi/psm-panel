import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import type { PIDI } from "@/types/Data/Base";
import type { PureState } from "@/types/App/States";
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