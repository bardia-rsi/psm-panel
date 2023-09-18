import type { RefObject } from "react";
import { useEffect } from "react";

export const useOnclickOutside = (ignoreList: RefObject<HTMLElement>[], handler: () => void, open: boolean): void => {
    useEffect(() => {

        const listener = (e: MouseEvent | TouchEvent): void => {

            for (let i = 0; i < ignoreList.length; i++) {
                if (!ignoreList[i].current || ignoreList[i].current?.contains(e.target as Node | null)) {
                    return;
                }
            }

            handler();

        }

        if (open) {

            window.addEventListener<"mousedown">("mousedown", listener);
            window.addEventListener<"touchstart">("touchstart", listener);

        }

        return () => {
            window.removeEventListener<"mousedown">("mousedown", listener);
            window.removeEventListener<"touchstart">("touchstart", listener);
        }

    }, [ignoreList, handler, open]);
}