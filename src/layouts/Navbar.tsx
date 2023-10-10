import type { ReactNode, FC, ReactElement } from "react";
import type { MotionProps } from "framer-motion";
import type { Props as HamburgerMenuButtonProps } from "@/components/HamburgerMenuButton";
import { useRef } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { useGetAppData } from "@/hooks/data/core";
import { useSticky } from "@/hooks/useSticky";
import HamburgerMenuButton from "@/components/HamburgerMenuButton";
import Skeleton from "@/components/ui/Skeleton";
import PSMLogo from "@/components/PSMLogo";

interface Props extends MotionProps {
    className?: string;
    responsive?: boolean;
    logo?: boolean;
    hamburgerMenuBtn?: HamburgerMenuButtonProps;
    children?: ReactNode;
}

const Navbar: FC<Props> = ({ children, logo, hamburgerMenuBtn, responsive, className, ...rest }): ReactElement => {

    const nav = useRef<HTMLDivElement>(null);
    const { status } = useGetAppData();

    useSticky(
        nav,
        (isSticky) => {
            if (nav.current) {
                nav.current.classList.toggle("shadow-[rgb(var(--bg-primary))]", isSticky);
                nav.current.classList.toggle("shadow-xl", isSticky);
            }
        }
    );

    return (
        <motion.nav className={cn(
                        "bg-primary flex gap-x-2 p-4 sticky -top-[0.0025rem] transition duration-300 z-10",
                        responsive && "sm:hidden",
                        className
                    )}
                    ref={nav}
                    {...rest}>
            <HamburgerMenuButton {...hamburgerMenuBtn} />
            {
                logo && (
                    status === "idle" || status === "loading"
                        ? <Skeleton h={2} w="100%" />
                        : <PSMLogo type="logoTypographyFull" className="max-w-xs -mb-2" />
                )
            }
            { children }
        </motion.nav>
    );

}

export default Navbar;