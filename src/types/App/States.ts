import type { Dictionary } from "@/types/Types";
import type { PIDI } from "@/types/Data/Base";
import type { Error } from "@/types/App/Error";

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type SortBy = "createdAt" | "updatedAt" | "lastUsed" | "alphabet";

export type Order = "asc" | "desc";

export interface StatePreferences<S = undefined> {
    status: Status;
    errors: Dictionary<Error>
    sortBy: S extends string ? SortBy | S : SortBy;
    order: Order;
}

export interface PureState<T extends PIDI> {
    items: Dictionary<T>;
}