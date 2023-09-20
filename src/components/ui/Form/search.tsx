import type { FC, ReactElement } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import cn from "classnames";
import Icon from "@/components/ui/Icon";

interface Props extends Omit<HTMLMotionProps<"input">, "type" | "layout"> {}

const SearchInput: FC<Props> = ({ className, ...rest }): ReactElement => (
    <div className="w-full relative">
        <motion.input type="text"
               className={cn(
                   "w-full bg-tertiary pl-8 pr-4 py-2 rounded-md border-none outline-none",
                   "hover:bg-fourth [&+span>svg>*]:hover:fill-primary",
                   "focus:bg-fourth [&+span>svg>*]:focus:fill-primary [&+span]:focus:animate-searching",
                   className
               )}
                      layout
                      {...rest} />
        <span className="absolute top-1/2 left-2 -translate-y-1/2">
            <Icon src="/icons/magnifier.svg" className="[&>*]:fill-secondary" />
        </span>
    </div>
);

export default SearchInput;