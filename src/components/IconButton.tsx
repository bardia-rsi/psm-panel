import type { FC, ReactElement } from "react";
import type { Props as ButtonProps } from "@/components/ui/Button";
import type { IconProps } from "@/components/ui/Icon";
import cn from "classnames";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface Props extends Omit<ButtonProps, "variant" | "children"> {
    icon: IconProps;
}

const IconButton: FC<Props> = ({ className, icon, ...rest }): ReactElement => (
    <Button variant="custom"
            className={cn(
                "!p-1 border-transparent [&>svg>*]:fill-secondary [&>svg>*]:hover:fill-primary",
                className
            )}
            type="button"
            {...rest}>
        <Icon {...icon} />
    </Button>
);

export type { Props };

export default IconButton;