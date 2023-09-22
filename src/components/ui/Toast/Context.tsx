import type { ReactNode, FC, ReactElement, Context } from "react";
import { createContext, useCallback, useState } from "react";
import { nanoid } from "nanoid";
import List from "./List";

type ToastId = number | string;
type AddToast = (content: Omit<Toast, "id">) => void;
type RemoveToast = (id: ToastId) => void;
export type ContainerPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface Toast {
    id: ToastId;
    type: "success" | "danger" | "warning" | "info" | "custom";
    content: string;
    autoRemove?: boolean;
    duration?: number;
    className?: string;
    onRemoveComplete?: () => void;
}

export interface ToastContextStructure {
    addToast: AddToast;
    removeToast: RemoveToast;
}

interface Props {
    children: ReactNode;
    position?: ContainerPosition;
    length?: number;
}

const defaultToastContext: ToastContextStructure = {
    addToast: () => {},
    removeToast: () => {}
}

export const ToastContext: Context<ToastContextStructure> = createContext(defaultToastContext);

const ToastContextProvider: FC<Props> = ({ children, position, length = 5 }): ReactElement => {

    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast: AddToast = useCallback((toast) => {
        setToasts(prevState => {

            if (prevState.length >= length) {
                prevState.shift();
            }

            return [...prevState, { id: nanoid(), ...toast }];

        });
    }, [setToasts, length]);

    const removeToast: RemoveToast = useCallback((id) => {
        setToasts(prevState => prevState.filter(toast => toast.id !== id));
    }, [setToasts]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast}}>
            <List toasts={toasts} position={position} />
            { children }
        </ToastContext.Provider>
    );

}

export default ToastContextProvider;