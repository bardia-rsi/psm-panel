import { EntityStateTypes, EntityTypes, EntityStates } from "@/types/App/DataTypes";

export const convertStateNameToType = (stateName: EntityStateTypes): EntityTypes => {
    return stateName.slice(0, -1) as EntityTypes;
}

export const convertTypeToStateName = (type: EntityTypes): Exclude<EntityStates, "home" | "trash" | "favorites"> => {
    return type + "s" as Exclude<EntityStates, "home" | "trash" | "favorites">;
}