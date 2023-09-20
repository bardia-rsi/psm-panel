import type { FC, ReactElement } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import ThemeContextProvider from "@/context/Theme";
import SidebarContextProvider from "@/layouts/Sidebar/Context";
import Sidebar from "@/layouts/Sidebar";

const Root: FC = (): ReactElement => {

    const location = useLocation();
    const currentOutlet = useOutlet();

    const locationArr = location.pathname?.split("/") ?? [];

    return (
        <ThemeContextProvider>
            <SidebarContextProvider>
                <Sidebar />
                <AnimatePresence mode="wait">
                    <Fragment key={locationArr[1]}>
                        { currentOutlet }
                    </Fragment>
                </AnimatePresence>
            </SidebarContextProvider>
        </ThemeContextProvider>
    );

}

export default Root;