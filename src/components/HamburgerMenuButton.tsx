import type { FC, ReactElement } from "react";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import cn from "classnames";

const HamburgerMenuButton: FC = (): ReactElement => {

    const { setVisibility } = useSidebarVisibility();

    return (
        <Button variant="custom"
                className={cn(
                    "bg-tertiary [&>svg>*]:fill-secondary border-transparent p-2",
                    "hover:bg-fourth [&>svg>*]:hover:fill-primary",
                    "sm:hidden"
                )}
                onClick={() => setVisibility(true)}>
            <Icon src="/icons/hamburger-menu.svg" />
        </Button>
    );

}

export default HamburgerMenuButton;