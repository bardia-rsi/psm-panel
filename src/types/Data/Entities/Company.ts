import type { PIDI } from "@/types/Data/Base";

export interface Company extends PIDI {
    name: string;
    website: string;
    about: string;
    logo: string;
    colors: {
        logo: {
            dark: string | null;
            light: string | null;
        },
        bg: {
            dark: string | null;
            light: string | null;
        }
    };
    isBank: boolean;
}