import type { DictionaryUnion } from "@/types/Types";
import type { EntityTypes } from "@/types/App/DataTypes";
import type { PartialBy } from "@/types/Types";
import type { Props as ControlProps } from "@/components/ui/Form/Control";

export type EntityForms = DictionaryUnion<EntityTypes, {
    image: string;
    tips: {
        title: string;
        description: string;
    }[];
    fields: {
        basic: PartialBy<ControlProps, "label">[];
        additional?: PartialBy<ControlProps, "label">[]
    }
}>;