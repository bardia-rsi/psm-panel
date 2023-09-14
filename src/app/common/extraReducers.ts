import type { Draft } from "@reduxjs/toolkit";
import type { StatePreferences } from "@/types/App/States";
import type { RejectedAction } from "@/types/App/ThunkActions";
import { nanoid } from "@reduxjs/toolkit";

type BaseState = Omit<StatePreferences, "sortBy" | "order">;

export const setLoadingStatus = <S extends BaseState>(state: Draft<S>) => {
    state.status = "loading";
}

export const setFailedStatus = <S extends BaseState>(state: Draft<S>, action: RejectedAction) => {

    state.status = "failed";

    if (action.payload) {
        state.errors[nanoid()] = action.payload;
    }

    return state;

}