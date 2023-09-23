import type { ReactNode, FC, ReactElement } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { useLgScreen } from "@/hooks/useScreen";

interface Props {
    children: ReactNode;
}

const Container: FC<Props> = ({ children }): ReactElement => {

    const isLgScreen: boolean = useLgScreen();

    return (
        <motion.div className={cn(
            "w-full lg:w-auto min-h-screen max-h-screen bg-primary flex lg:flex-1 flex-col py-4 px-3 xs:px-8",
            "lg:border-l-2 lg:border-l-primary overflow-y-auto",
            isLgScreen && "absolute top-0 left-0 z-20"
        )}
                    initial={ isLgScreen ? { x: "-100%" } : { opacity: 0 }}
                    animate={ isLgScreen ? { x: 0 } : { opacity: 1 }}
                    exit={ isLgScreen ? { x: "-100%" } : { opacity: 0 }}
                    transition={{ type: "tween" }}>
            { children }
        </motion.div>
    );

}

export default Container;