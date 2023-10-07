import type { FC, ReactElement } from "react";
import type { MenuItem } from "@/types/Elements/Sidebar";
import type { Props as MenuProps } from "@/components/ui/Menu";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useSidebarVisibility } from "@/hooks/useSidebarVisibility";
import { useDetectTouchDevice } from "@/hooks/useDetectTouchDevice";
import MenuButton from "@/layouts/Sidebar/MenuButton";
import Icon from "@/components/ui/Icon";
import Menu from "@/components/ui/Menu";
import MenuItemEl from "@/components/ui/Menu/Item";

interface Props {
    item: MenuItem & { children: MenuItem[] };
}

const MotionMenu = motion<MenuProps>(Menu);

const CollapsibleMenu: FC<Props> = ({ item }): ReactElement => {

    const [isCollapse, setIsCollapse] = useState<boolean>(false);
    const location = useLocation();
    const { setVisibility } = useSidebarVisibility();
    const isTouchDevice = useDetectTouchDevice();

    const locationArr = location?.pathname.split("/") ?? [];

    useEffect(() => {
        if (locationArr[1] === "settings") {
            setIsCollapse(true);
        } else {
            setIsCollapse(false);
        }
    }, [locationArr[1]]);

    return (
        <div className="flex flex-col overflow-y-hidden">
            <MenuButton icon={{ src: item.icon }}
                        hover={!isTouchDevice}
                        className={cn(
                            "[&>span]:text-secondary outline-none",
                            !isTouchDevice && "[&>span]:hover:text-white",
                            isCollapse
                                ? "bg-ac-primary-500 [&>span]:text-white [&>svg>*]:fill-white"
                                : "bg-secondary [&>span]:text-secondary [&>svg>*]:fill-secondary"
                        )}
                        onClick={() => setIsCollapse(prevState => !prevState)}>
                <span className="flex-1 text-left">{ item.text }</span>
                <Icon src="/icons/collapse-arrow.svg"
                      className={cn("transition-all duration-500 rotate-0", isCollapse && "rotate-[180deg]")}
                      w={0.75}
                      h={0.75} />
            </MenuButton>
            <AnimatePresence mode="wait">
                {
                    isCollapse && (
                        <MotionMenu initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ type: "tween" }}
                                    className="!p-0 mt-2 bg-primary rounded-md">
                            {
                                item.children.map(child => (
                                    <MenuItemEl key={child.id}
                                                to={child.url}
                                                text={child.text}
                                                icon={{ src: child.icon }}
                                                count={child.count}
                                                onClick={() => setVisibility(false)}
                                    />
                                ))
                            }
                        </MotionMenu>
                    )
                }
            </AnimatePresence>
        </div>
    );

}

export default CollapsibleMenu;