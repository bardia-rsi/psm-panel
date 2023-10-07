import type { ReactNode, ReactElement } from "react";
import { forwardRef } from "react";
import cn from "classnames";

interface Props {
    className?: string;
    children: ReactNode;
}

const Menu = forwardRef<HTMLUListElement, Props>(({ className, children }, ref): ReactElement => (
    <ul className={cn("py-2", className)} ref={ref}>
        { children }
    </ul>
));

export type { Props };

export default Menu;