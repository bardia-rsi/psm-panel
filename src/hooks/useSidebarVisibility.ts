import type { SidebarContextStructure } from "@/layouts/Sidebar/Context";
import { useContext } from "react";
import { SidebarContext } from "@/layouts/Sidebar/Context";

export const useSidebarVisibility = (): SidebarContextStructure => {
    return useContext(SidebarContext);
}