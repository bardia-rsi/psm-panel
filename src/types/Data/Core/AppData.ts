import type { Sidebar } from "@/types/Elements/Sidebar";
import type { Plan } from "@/types/Data/Core/Plan";

export interface AppData {
    logo: string;
    logoTypography: string;
    logoTypographyFull: string;
    sidebar: Sidebar;
    plans: Plan[];
}