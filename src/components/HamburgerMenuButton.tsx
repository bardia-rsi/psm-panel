import type { FC, ReactElement } from "react";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import cn from "classnames";

interface Props {
    background?: boolean;
    className?: string;
}

const HamburgerMenuButton: FC<Props> = ({ background = true, className }): ReactElement => {

    const { setVisibility } = useSidebarVisibility();

    return (
        <Button variant="custom"
                className={cn(
                    "[&>svg>*]:fill-secondary border-transparent p-2",
                    "hover:bg-fourth [&>svg>*]:hover:fill-primary",
                    "sm:hidden",
                    background && "bg-tertiary",
                    className
                )}
                onClick={() => setVisibility(true)}>
            <Icon src="/icons/hamburger-menu.svg" />
        </Button>
    );

}

export type { Props };

export default HamburgerMenuButton;