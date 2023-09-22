import type { Sidebar } from "@/types/Elements/Sidebar";
import type { Plan } from "@/types/Data/Core/Plan";
import type { EntityForms } from "@/types/Data/Core/EntityForms";

export interface AppData {
    logo: string;
    logoTypography: string;
    logoTypographyFull: string;
    sidebar: Sidebar;
    plans: Plan[]
    entityForms: EntityForms;
}