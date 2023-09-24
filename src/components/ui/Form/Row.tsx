import type { ReactElement, FC } from "react";
import cn from "classnames";

export interface Props {
    children: ReactElement[] | ReactElement;
    breakpoint?: "xs" | "sm";
    className?: string;
}

const Row: FC<Props> = ({ className, breakpoint = "sm", children }): ReactElement => (
    <div className={cn(
        "w-full flex flex-col gap-y-4",
        breakpoint === "sm" ? "sm:flex-row sm:gap-x-4" : "xs:flex-row xs:gap-x-4",
        className
    )}>
        { children }
    </div>
);

export default Row;