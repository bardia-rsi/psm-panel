import type { Dictionary } from "@/types/Types";
import type { Order } from "@/types/App/States";
import { sortBy } from "lodash";

export const sort = <T extends Dictionary>(items: T[], sort: string, order: Order): T[] => {

    if (sort === "alphabet") {
        return order === "asc"
            ? sortBy<T>(items, [(value) => value?.company?.name || value?.bank?.name || value.name])
            : sortBy<T>(items, [(value) => value?.company?.name || value?.bank?.name || value.name]).reverse();
    }

    items.sort((a, b) => new Date(b[sort]).getTime() - new Date(a[sort]).getTime());

    return order === "asc" ? items : items.reverse();

}