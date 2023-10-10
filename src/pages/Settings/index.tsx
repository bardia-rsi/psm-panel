import Navbar from "@/layouts/Navbar";
import type { FC, ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation, useOutlet } from "react-router-dom";
import { useFetchUser } from "@/hooks/data/core";

const Settings: FC = (): ReactElement => {

    const navigate = useNavigate();
    const currentOutlet = useOutlet();
    const location = useLocation();
    const locationArr = location.pathname.split("/") ?? [];

    useFetchUser();

    if (location.pathname === "/settings") {
        navigate("account");
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div key={locationArr[2]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-h-full flex-1 overflow-y-auto">
                <Navbar logo responsive hamburgerMenuBtn={{ background: false, className: "-ml-2" }} />
                { currentOutlet }
            </motion.div>
        </AnimatePresence>
    );

}

export default Settings;