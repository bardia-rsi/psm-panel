import type { Dictionary } from "@/types/Types";
import type { Order } from "@/types/App/States";
import { sortBy, random } from "lodash";

export const sort = <T extends Dictionary>(items: T[], sort: string, order: Order): T[] => {

    if (sort === "alphabet") {
        return order === "asc"
            ? sortBy<T>(items, [(value) => value?.company?.name || value?.bank?.name || value.name])
            : sortBy<T>(items, [(value) => value?.company?.name || value?.bank?.name || value.name]).reverse();
    }

    items.sort((a, b) => new Date(b[sort]).getTime() - new Date(a[sort]).getTime());

    return order === "asc" ? items : items.reverse();

}

export const sampleI = <T>(arr: Array<T>): [number, T] => {

    const index = random(0, arr.length - 1);

    return [index, arr[index]];

}