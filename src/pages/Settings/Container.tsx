import type { ReactNode, FC, ReactElement } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

interface Props {
    className?: string;
    children: ReactNode;
}

const Container: FC<Props> = ({ className, children }): ReactElement => (
    <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn("max-h-screen flex-1 px-8 py-6 overflow-y-auto", className)}>
        { children }
    </motion.div>
);

export default Container;