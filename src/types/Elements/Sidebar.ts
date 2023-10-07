import type { CTA } from "@/types/Elements/CTA";

export interface MenuItem {
    id: number;
    url: string;
    icon: string;
    text: string;
    count?: number
}

export interface Sidebar {
    sections: {
        id: number;
        title?: string;
        menu: (MenuItem & { children: MenuItem[] })[];
    }[];
    cta?: CTA;
}