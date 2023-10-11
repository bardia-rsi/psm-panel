import type { ReactNode, FC, ReactElement } from "react";
import { useRef } from "react";
import { motion } from "framer-motion"
import cn from "classnames";
import { useOnclickOutside } from "@/hooks/useOnclickOutside";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";

interface Props {
    children: ReactNode;
}

const Nav: FC<Props> = ({ children }): ReactElement => {

    const navEl = useRef<HTMLDivElement>(null)
    const { visibility, setVisibility } = useSidebarVisibility();

    useOnclickOutside([navEl], () => setVisibility(false), visibility );

    return (
        <motion.nav className={cn(
            "sm:w-1/6 min-w-[15rem] max-w-[15rem] lg:max-w-[20rem] min-h-full max-h-full bg-secondary",
            "flex flex-col py-4 px-2 overflow-y-auto"
        )}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween" }}
                    ref={navEl}>
            { children }
        </motion.nav>
    );

}

export default Nav;