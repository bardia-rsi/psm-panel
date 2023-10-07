import type { ButtonHTMLAttributes, FC, ReactElement } from "react";
import type { IconProps } from "@/components/ui/Icon";
import cn from "classnames";
import Icon from "@/components/ui/Icon";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconProps;
    hover?: boolean;
}

const MenuButton: FC<Props> = ({ icon, hover = true, children, className, ...rest }): ReactElement => (
    <button className={cn(
        "flex justify-start items-center gap-x-2 py-2 px-4 rounded-md font-head font-normal text-sm",
        "text-secondary [&>svg>*]:fill-secondary",
        hover && "hover:bg-ac-primary-500 hover:text-white [&>svg>*]:hover:fill-white",
        className
    )} {...rest}>
        <Icon {...icon} />
        { children }
    </button>
);

export default MenuButton;