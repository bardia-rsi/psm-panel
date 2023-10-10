import type { FC, ReactElement } from "react";
import { Fragment, useEffect } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeContextProvider from "@/context/Theme";
import ToastContextProvider from "@/components/ui/Toast";
import SidebarContextProvider from "@/layouts/Sidebar/Context";
import Sidebar from "@/layouts/Sidebar";

const Root: FC = (): ReactElement => {

    const location = useLocation();
    const navigate = useNavigate();
    const currentOutlet = useOutlet();

    const locationArr = location.pathname?.split("/") ?? [];

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/all-items");
        }
    }, [location.pathname]);

    return (
        <ThemeContextProvider>
            <ToastContextProvider>
                <SidebarContextProvider>
                    <Sidebar />
                    <AnimatePresence mode="wait">
                        <Fragment key={locationArr[1]}>
                            { currentOutlet }
                        </Fragment>
                    </AnimatePresence>
                </SidebarContextProvider>
            </ToastContextProvider>
        </ThemeContextProvider>
    );

}

export default Root;