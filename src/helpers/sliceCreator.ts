import type { SliceCaseReducers, ValidateSliceCaseReducers, Draft, PayloadAction } from "@reduxjs/toolkit";
import type { BaseEntityMeta, PIDR } from "@/types/Data/Base";
import type { EntityState } from "@/types/App/States";
import type { Dictionary } from "@/types/Types";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { camelCase, lowerFirst, omit } from "lodash";
import { set, create, update, remove } from "@/app/actions/entities";
import { changeSortByReducer, changeOrderReducer } from "@/app/common/caseReducers";
import { setLoadingStatus, setFailedStatus, setDictionaryData } from "@/app/common/extraReducers";

export const entitySliceCreator = <
    T extends BaseEntityMeta,
    C extends Dictionary,
    U extends RequiredKeys<Partial<BaseEntityMeta>, "pid">,
    O extends BaseEntityMeta = T,
    S extends string | undefined = "favorite",
    R extends SliceCaseReducers<EntityState<T, S>> = SliceCaseReducers<EntityState<T, S>>
> (
    name: string,
    initialState: EntityState<T, S> = {
        items: {},
        status: "idle",
        errors: {},
        sortBy: "createdAt",
        order: "asc"
    } as EntityState<T, S>,
    reducers: ValidateSliceCaseReducers<EntityState<T, S>, R> | {} = {}
) => {

    name = camelCase(lowerFirst(name));

    const extraActions = {
        set: set<T, O>(name, "data"),
        create: create<T, O, C>(name, "data"),
        update: update<T, O, U>(name, "data"),
        remove: remove(name, "data")
    }

    const slice = createSlice({
        name: `entities/${name}`,
        initialState,
        reducers: {
            "sortBy/change": changeSortByReducer,
            "order/change": changeOrderReducer,
            "remove/soft": (state: Draft<EntityState<T, S>>, action: PayloadAction<PIDR>) => {
                return { ...state, items: omit(state.items, action.payload) };
            },
            ...reducers
        },
        extraReducers: builder => {
            builder
                // Remove reducers
                .addCase(extraActions.remove.fulfilled, (state, action) => {

                    state.status = "succeeded";

                    state.items = omit(state.items, action.payload);

                    return state;

                })
                .addCase(extraActions.remove.rejected, (state, action) => {

                    if (action.payload) {
                        if (action.payload.code === 405) {
                            if (state.items.hasOwnProperty(action.meta.arg)) {
                                
                                state.status = "succeeded";
                                state.items = omit(state.items, action.meta.arg);
                                
                            } else {

                                state.status = "failed";
                                state.errors[nanoid()] = {
                                    code: 500,
                                    message: "Internal error",
                                    occurrenceTime: Date.now()
                                }

                            }
                        } else {

                            state.status = "failed";
                            state.errors[nanoid()] = action.payload;

                        }
                    }

                    return state;

                })
                // Other reducers
                .addMatcher(
                    action => [
                        extraActions.set.pending.type,
                        extraActions.create.pending.type,
                        extraActions.remove.pending.type
                    ].includes(action.type),
                    setLoadingStatus<EntityState<T, S>>
                )
                .addMatcher(
                    action => [
                        extraActions.set.fulfilled.type,
                        extraActions.create.fulfilled.type,
                        extraActions.update.fulfilled.type,
                    ].includes(action.type),
                    setDictionaryData<T, EntityState<T, S>>()
                )
                .addMatcher(
                    action => [
                        extraActions.set.rejected.type,
                        extraActions.create.rejected.type,
                        extraActions.update.rejected.type,
                    ].includes(action.type),
                    setFailedStatus<EntityState<T, S>>
                )
        }
    });

    return {
        slice,
        extraActions: {
            ...extraActions,
            addToTrash: (pid: PIDR) => extraActions.update({ pid, trash: Date.now() } as U),
            removeFromTrash: (pid: PIDR) => extraActions.update({ pid, trash: null } as U),
            addToFavorites: (pid: PIDR) => extraActions.update({ pid, favorite: Date.now() } as U),
            removeFromFavorites: (pid: PIDR) => extraActions.update({ pid, favorite: null } as U)
        }
    }
}