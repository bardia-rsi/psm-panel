import type { Draft } from "@reduxjs/toolkit";
import type { StatePreferences, PureState } from "@/types/App/States";
import type { BaseEntityMeta } from "@/types/Data/Base";
import type { FullFilledAction, RejectedAction } from "@/types/App/ThunkActions";
import type { Dictionary } from "@/types/Types";
import { nanoid } from "@reduxjs/toolkit";

type BaseState = Omit<StatePreferences, "sortBy" | "order">;

export const setLoadingStatus = <S extends BaseState>(state: Draft<S>) => {
    state.status = "loading";
}

export const setDictionaryData = <
    T extends BaseEntityMeta,
    S extends PureState<T> & BaseState
>(checkTrash: boolean = true) => (state: Draft<S>, action: FullFilledAction<Dictionary<T>>) => {

    state.status = "succeeded";

    if (Object.keys(action.payload).length >= 1) {
        Object.keys(action.payload).forEach(key => {

            if (checkTrash && action.payload[key].trash !== null) {
                return;
            }

            state.items[key] = action.payload[key] as Draft<T>;

        });
    }

    return state;

}

export const setFailedStatus = <S extends BaseState>(state: Draft<S>, action: RejectedAction) => {

    state.status = "failed";

    if (action.payload) {
        state.errors[nanoid()] = action.payload;
    }

    return state;

}