import type { RefObject, ReactNode, FC, ReactElement } from "react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useOnclickOutside } from "@/hooks/useOnclickOutside";

interface Props {
    isOpen: boolean;
    btnRef: RefObject<HTMLElement>;
    ignoreList?: RefObject<HTMLElement>[];
    onClickOutside: () => void;
    full?: boolean;
    className?: string;
    children: ReactNode;
}

interface Cords {
    top: number;
    left: number;
    origin: `${number}%`;
    translate: `${number}%`
}

const Dropdown: FC<Props> = (
    { isOpen, btnRef, ignoreList, onClickOutside, full, className, children }
): ReactElement => {

    const [cords, setCords] = useState<Cords>({ top: 0, left: 0, origin: "0%", translate: "0%" });
    const [width, setWidth] = useState<number>(0);
    const dropdownEl = useRef<HTMLDivElement>(null);
    const windowDimensions = useWindowDimensions();

    useOnclickOutside([dropdownEl, btnRef].concat(ignoreList ?? []), onClickOutside, isOpen);

    useEffect(() => {

        if (btnRef.current) {

            const rect: DOMRect = btnRef.current.getBoundingClientRect();
            const newCords: Cords = { ...cords, top: rect.bottom };

            if (rect.left - 64 < 0) {
                newCords.left = rect.left;
                newCords.origin = "5%";
                newCords.translate = "0%"
            } else if (rect.right + 64 > windowDimensions.w) {
                newCords.left = rect.right;
                newCords.origin = "95%";
                newCords.translate = "-100%"
            } else {
                newCords.left = Math.ceil(rect.x + rect.width / 2);
                newCords.origin = "50%"
                newCords.translate = "-50%"
            }

            setCords(newCords);

            if (full) {
                setWidth(rect.width);
            }

        }

    }, [btnRef, windowDimensions]);

    return createPortal(
        <AnimatePresence mode="wait">
            { isOpen && (
                <div className="absolute z-[90] mt-2"
                     ref={dropdownEl}
                     style={{ left: cords.left, top: cords.top, transform: `translateX(${cords.translate})` }}>
                    <motion.div className={cn("bg-secondary p-4 rounded-md shadow-black/20 shadow-xl", className)}
                                style={{ transformOrigin: `${cords.origin} 0%`, width: full ? `${width}px` : "auto" }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}>
                        { children }
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    )

}

export default Dropdown;