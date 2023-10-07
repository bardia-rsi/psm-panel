import { useState, useEffect } from "react";

export const useDetectTouchDevice = (): boolean => {

    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

    useEffect(() => {
        setIsTouchDevice(
            // @ts-ignore
            "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
        );
    }, []);

    return isTouchDevice;

}