import type { ReactNode, FC, ReactElement } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import cn from "classnames";

interface Props {
    className?: string;
    children: ReactNode;
}

const VARIANTS: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 }
}

const Container: FC<Props> = ({ className, children }): ReactElement => (
    <motion.div className={cn("bg-secondary p-4 rounded-md", className)} variants={VARIANTS}>
        { children }
    </motion.div>
);

export default Container;