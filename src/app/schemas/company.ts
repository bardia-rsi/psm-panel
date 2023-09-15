import type { Company } from "@/types/Data/Entities/Company";
import { schema } from "normalizr";

export const company = new schema.Entity<Company>(
    "companies",
    {},
    { idAttribute: "pid" }
);