import type { FC, ReactElement } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

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

const PasswordStrength: FC = (): ReactElement => {

    return (
        <motion.div className="max-h-screen flex flex-1 flex-col gap-4 p-4 overflow-y-auto"
                    variants={FADE_VARIANTS}
                    initial="hide"
                    animate="show"
                    exit="hide">
            Password Strength
        </motion.div>
    );

}

export default PasswordStrength;