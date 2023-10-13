import type { FC, ReactElement } from "react";
import type { PIDR } from "@/types/Data/Base";
import type { Props as LogoProps } from "@/components/Logo";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import Logo from "@/components/Logo";

interface Props {
    pid: PIDR;
    logo: LogoProps;
    title: string;
    subtitle?: string | null;
}

const MotionLink = motion(NavLink);

const Item: FC<Props> = ({ pid, logo, title, subtitle }): ReactElement => (
    <MotionLink to={pid}
                className={({ isActive }) => cn(
                    "flex items-center gap-x-4 p-4 rounded-md hover:bg-ac-primary-500 group",
                    isActive ? "bg-ac-primary-500 active" : "bg-primary"
                )}
                layout
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
        <Logo {...logo}
              className={cn(
                  "transition shadow-xl shadow-black/15 dark:shadow-black/50",
                  "group-hover:shadow-black/25 group-[.active]:shadow-black/25",
                  logo.className
              )} />
        <div className="flex flex-1 flex-col justify-evenly overflow-hidden">
            <h6 className={cn(
                "text-lg font-bold group-hover:text-white group-[.active]:text-white",
                "whitespace-nowrap overflow-hidden text-ellipsis"
            )}>
                { title }
            </h6>
            { subtitle && (
                <p className={cn(
                    "font-medium text-tertiary group-hover:text-white group-[.active]:text-white",
                    "whitespace-nowrap overflow-hidden text-ellipsis"
                )}>
                    { subtitle }
                </p>
            )}
        </div>
    </MotionLink>
);

export type { Props };

export default Item;