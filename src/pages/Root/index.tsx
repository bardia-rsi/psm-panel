import type { FC, ReactElement } from "react";
import SidebarContextProvider from "@/layouts/Sidebar/Context";
import ThemeContextProvider from "@/context/Theme";
import Sidebar from "@/layouts/Sidebar";

const Root: FC = (): ReactElement => (
    <ThemeContextProvider>
        <SidebarContextProvider>
            <Sidebar />
        </SidebarContextProvider>
    </ThemeContextProvider>
);

export default Root;