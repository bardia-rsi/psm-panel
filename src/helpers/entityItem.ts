import type { BaseEntityMeta, Timestamps } from "@/types/Data/Base";
import type { EntityItem } from "@/types/Data/Entities/Entity";
import { omit } from "lodash";

type FormFields<T extends BaseEntityMeta> = Omit<T, Exclude<keyof (BaseEntityMeta & Timestamps), "note">>;

const getEntityFields = <T extends BaseEntityMeta = EntityItem>(item: T): FormFields<T> => {
    return omit(
        item,
        "pid", "createdAt", "updatedAt", "favorite", "trash"
    );
}

export type { FormFields };

export { getEntityFields };