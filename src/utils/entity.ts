import { EntityStateTypes, EntityTypes } from "@/types/App/DataTypes";

export const convertStateNameToType = (stateName: EntityStateTypes): EntityTypes => {
    return stateName.slice(0, -1) as EntityTypes;
}