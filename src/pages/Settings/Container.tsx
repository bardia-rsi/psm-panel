import type { ReactNode, FC, ReactElement } from "react";
import cn from "classnames";

interface Props {
    className?: string;
    children: ReactNode;
}

const Container: FC<Props> = ({ className, children }): ReactElement => (
    <div className={cn("px-4 md:px-8 py-6", className)}>
        { children }
    </div>
);

export default Container;