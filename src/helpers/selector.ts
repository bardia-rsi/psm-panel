import type { Selector } from "@reduxjs/toolkit";
import type { BaseEntityMeta, PIDR } from "@/types/Data/Base";
import type { Dictionary } from "@/types/Types";
import type { EntityState } from "@/types/App/States";
import type { State } from "@/app/store";
import type { StoredEntityItem, StoreEntityItemWithType } from "@/types/Data/Entities/Entity";
import type { EntityStates } from "@/types/App/DataTypes";
import type { StateSelector } from "@/app/selectors/state";
import { createSelector } from "@reduxjs/toolkit";
import { selectBanks, selectCompanies } from "@/app/selectors/entity";
import { selectState } from "@/app/selectors/state";
import { sort as sortItems } from "@/utils/array";

type NormalizedItem<T> = Dictionary<T & {
    company?: PIDR;
    bank?: PIDR;
}>;

export const createOutput = <
    T extends BaseEntityMeta,
    O extends BaseEntityMeta = T,
    S extends EntityState<T> = EntityState<T>
>(state: S, rootState: State, denormalize: boolean, sort: boolean): Dictionary<O> => {

    let items: NormalizedItem<T | O> = { ...state.items };

    if (denormalize) {
        Object.keys(items).forEach(key => {

            if (items[key].company) {
                items[key] = {
                    ...items[key],
                    company: selectCompanies(rootState)[items[key].company!]
                }
            }

            if (items[key].bank) {
                items[key] = {
                    ...items[key],
                    bank: selectBanks(rootState)[items[key].bank!]
                }
            }

        });
    }

    if (sort) {
        items = Object.fromEntries(
            sortItems<T | O>(Object.values(items), state.sortBy, state.order).map(item => [item.pid, item])
        );
    }

    return items as Dictionary<O>;

}

export const createEntitySelector = <
    T extends StoredEntityItem | StoreEntityItemWithType,
    O extends BaseEntityMeta = T
>(
    stateName: Exclude<EntityStates, "home">,
    denormalize: boolean = false,
    sort: boolean = true
): Selector<State, EntityState<O>> => {
    return createSelector<[StateSelector], EntityState<O>>(
        selectState,
        state => ({
            ...state.entities[stateName],
            items: createOutput<T, O>(state.entities[stateName] as EntityState<T>, state, denormalize, sort)
        }) as EntityState<O>
    );
}