import type { FC, ReactElement } from "react";
import { Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useOutlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar";

const Settings: FC = (): ReactElement => {

    const navigate = useNavigate();
    const currentOutlet = useOutlet();
    const location = useLocation();
    const locationArr = location.pathname.split("/") ?? [];

    if (location.pathname === "/settings") {
        navigate("account-password");
    }

    return (
        <AnimatePresence mode="wait">
            <Fragment key={locationArr[2]}>
                <Navbar logo responsive hamburgerMenuBtn={{ background: false, className: "-ml-2" }} />
                { currentOutlet }
            </Fragment>
        </AnimatePresence>
    );

}

export default Settings;