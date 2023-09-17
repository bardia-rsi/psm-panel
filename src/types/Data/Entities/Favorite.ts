import type { StoreEntityItemWithType, EntityItemWithType } from "@/types/Data/Entities/Entity";

export type StoredFavoriteItem = StoreEntityItemWithType & { favorite: Date };

export type FavoriteItem = EntityItemWithType & { favorite: Date };