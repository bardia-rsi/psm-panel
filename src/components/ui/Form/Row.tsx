import type { ReactElement, FC } from "react";
import cn from "classnames";

export interface Props {
    children: ReactElement[] | ReactElement;
    className?: string;
}

const Row: FC<Props> = ({ className, children }): ReactElement => (
    <div className={cn("w-full flex flex-col sm:flex-row gap-y-4 sm:gap-x-4", className)}>
        { children }
    </div>
);

export default Row;