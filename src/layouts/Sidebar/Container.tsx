import type { ReactElement, FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useSmScreen } from "@/hooks/useScreen";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";
import Nav from "@/layouts/Sidebar/Nav";

interface Props {
    children: ReactElement;
}

const Container: FC<Props> = ({ children }): ReactElement => {

    const isSmScreen: boolean = useSmScreen();
    const { visibility } = useSidebarVisibility();

    return (
        <AnimatePresence mode="wait">
            {
                isSmScreen
                    ? (
                        <AnimatePresence mode="wait" key="m">
                            {
                                visibility && (
                                    <motion.div className={cn(
                                        "absolute top-0 right-0 bottom-0 left-0 z-40",
                                        "bg-black/40 backdrop-blur-sm"
                                    )}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}>
                                        <Nav>{ children }</Nav>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    )
                    : <Nav key="d">{ children }</Nav>
            }
        </AnimatePresence>
    );

}

export default Container;