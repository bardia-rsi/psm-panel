import type { CTA } from "@/types/Elements/CTA";

export interface Sidebar {
    sections: {
        id: number;
        title?: string;
        menu: {
            id: number;
            url: string;
            icon: string;
            text: string;
            count?: number
        }[];
    }[];
    cta?: CTA;
}