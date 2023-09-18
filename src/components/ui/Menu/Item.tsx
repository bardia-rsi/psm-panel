import type { FC, ReactElement } from "react";
import type { NavLinkProps } from "react-router-dom";
import type { IconProps } from "@/components/ui/Icon";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { titleCase } from "@/utils/string";
import Icon from "@/components/ui/Icon";

interface Props extends Pick<NavLinkProps, "onClick"> {
    to: string;
    text: string;
    icon: IconProps;
    count?: number;
    className?: string;
}

const MenuItem: FC<Props> = ({ to, text, icon, count, className, ...rest }): ReactElement => (
    <li>
        <NavLink to={to}
                 className={({ isActive }) => cn(
                     "flex items-center gap-x-2 py-2 px-4 rounded-md font-head font-normal text-sm",
                     "hover:bg-ac-primary-500 [&>span]:hover:text-white [&>svg>*]:hover:fill-white",
                     isActive
                         ? "bg-ac-primary-500 [&>span]:text-white [&>svg>*]:fill-white"
                         : "[&>span]:text-secondary [&>svg>*]:fill-secondary",
                     className
                 )}
                 {...rest}>
            <Icon {...icon} />
            <span className="flex-1">{ titleCase(text) }</span>
            { count !== undefined && <span>{ count }</span> }
        </NavLink>
    </li>
);

export type { Props };

export default MenuItem;