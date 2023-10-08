import type { FC, ReactElement } from "react";
import type { Props } from "@/components/ui/Button";
import cn from "classnames";
import Button from "@/components/ui/Button";

const NavButton: FC<Omit<Props, "variant">> = ({ className, children, ...rest }): ReactElement => (
    <Button variant="custom"
            className={cn(
                "bg-tertiary text-secondary [&>svg>*]:fill-secondary border-transparent",
                "gap-x-1 py-1.5 px-4 hover:text-white [&>svg>*]:hover:fill-white",
                className
            )}
            {...rest}>
        { children }
    </Button>
);

export default NavButton;