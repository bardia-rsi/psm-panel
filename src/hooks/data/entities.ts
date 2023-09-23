import type { DictionaryUnion } from "@/types/Types";
import type { EntityStates } from "@/types/App/DataTypes";
import type { EntityState } from "@/types/App/States";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import type { PIDR } from "@/types/Data/Base";
import type { Status } from "@/types/App/States";
import * as entitiesSlice from "@/app/slices/entities";
import * as selectors from "@/app/selectors/entity";
import { useGetData } from "@/hooks/useGetData";
import { useAppSelector } from "@/app/hooks";

const selectMethods: DictionaryUnion<EntityStates> = {
    home: selectors.selectEntities,
    trash: selectors.selectTrash,
    favorites: selectors.selectFavorites,
    contacts: selectors.selectContacts,
    logins: selectors.selectLogins,
    paymentCards: selectors.selectPaymentCards,
    wifiPasswords: selectors.selectWifiPasswords
}

export const useGetEntity = (stateName: EntityStates): EntityState<EntityItemWithType, "trash" | "favorite"> => {
    return useGetData(entitiesSlice[stateName].set, selectMethods[stateName]);
}

export const useGetEntityItem = (
    type: Exclude<EntityStates, "home">,
    pid: PIDR
): { status: Status; item: EntityItemWithType } => {

    const state = useAppSelector<EntityState<EntityItemWithType>>(selectMethods[type]);

    return {
        status: state.status,
        item: { ...state.items[pid] }
    }

}