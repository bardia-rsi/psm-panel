import type { FC, ReactElement } from "react";
import type { ContainerPosition, Toast as ToastStructure } from "./Context";
import { createPortal } from "react-dom";
import cn from "classnames";
import Toast from "../Toast/Toast";

interface Props {
    toasts: ToastStructure[];
    position?: ContainerPosition;
}

const List: FC<Props> = ({ position = "top-center", toasts }): ReactElement =>
    createPortal((
        <div className={cn(
            "w-full sm:w-auto fixed z-[100] flex flex-col items-center gap-y-4 px-3 xs:px-4",
            position.includes("top") && "top-4",
            position.includes("bottom") && "bottom-4",
            position.includes("left") && "left-4",
            position.includes("right") && "right-4",
            position.includes("center") && "left-1/2 -translate-x-1/2"
        )}>
            {
                toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))
            }
        </div>
    ), document.body);

export default List;