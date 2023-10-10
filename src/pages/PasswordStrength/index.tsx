import type { FC, ReactElement } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Navbar from "@/layouts/Navbar";
import PasswordGenerator from "@/pages/PasswordStrength/PasswordGenerator";
import Logins from "@/pages/PasswordStrength/Logins";
import PasswordChecker from "@/pages/PasswordStrength/PasswordChecker";

const FADE_VARIANTS: Variants = {
    hide: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1
        }
    },
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const VARIANTS: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 }
}

const PasswordStrength: FC = (): ReactElement => {

    return (
        <motion.div className="max-h-screen flex flex-1 flex-col gap-4 pb-4 overflow-y-auto"
                    variants={FADE_VARIANTS}
                    initial="hide"
                    animate="show"
                    exit="hide">
            <Navbar variants={VARIANTS} logo responsive hamburgerMenuBtn={{ background: false, className: "-ml-2" }} />
            <div className="flex flex-col lg:flex-row gap-4">
                <PasswordGenerator />
                <PasswordChecker />
            </div>
            <div className="flex flex-col gap-4">
                <Logins />
            </div>
        </motion.div>
    );

}

export default PasswordStrength;