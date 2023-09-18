import type { ReactElement, FC } from "react";
import type { Props as MenuItemProps } from "@/components/ui/Menu/Item";
import cn from "classnames";

interface Props {
    className?: string;
    children: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
}

const Menu: FC<Props> = ({ className, children }): ReactElement => (
    <ul className={cn("py-2", className)}>
        { children }
    </ul>
);

export default Menu;