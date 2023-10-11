import { schema } from "normalizr";
import { company } from "./company";

export const entity = new schema.Entity(
    "entities",
    { company, bank: company },
    {
        idAttribute: "pid"
    }
);










