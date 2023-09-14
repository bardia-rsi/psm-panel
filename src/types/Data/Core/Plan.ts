import type { LinkVariants, Sizes } from "@/types/Theme/Properties";

export interface Plan {
    id: number;
    variant: "primary" | "secondary";
    name: string;
    price?: {
        regular: number;
        discount?: number;
        description: string;
        per: string;
        period: number;
    };
    description?: string;
    link: {
        variant: LinkVariants;
        size?: Sizes;
        full?: boolean;
        compact?: boolean;
    }
    features: {
        id: number;
        icon?: string;
        content: string;
        disabled: boolean;
    }[];
}