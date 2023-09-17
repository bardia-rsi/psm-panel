import type { StateSelector } from "@/app/selectors/state";
import type { State as AppDataState } from "@/app/slices/core/appData";
import type { State as UserState } from "@/app/slices/core/user";
import { createSelector } from "@reduxjs/toolkit";
import { selectState } from "@/app/selectors/state";

export const selectAppData = createSelector<[StateSelector], Omit<AppDataState, "errors">>(
    selectState,
    (state) => ({ data: state.core.appData.data, status: state.core.appData.status })
);

export const selectUser = createSelector<[StateSelector], Omit<UserState, "errors">>(
    selectState,
    (state) => ({ data: state.core.user.data, status: state.core.user.status })
);