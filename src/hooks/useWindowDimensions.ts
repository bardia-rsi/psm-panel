import { useState, useEffect } from "react";

interface WindowDimensions {
    w: number;
    h: number;
}

const getWindowDimensions = (): WindowDimensions => ({ w: window.innerWidth, h: window.innerHeight });

export const useWindowDimensions = (): WindowDimensions => {

    const [dimensions, setDimensions] = useState<WindowDimensions>(getWindowDimensions());

    useEffect(() => {

        const resizeEventListener = (): void => {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", resizeEventListener);

        return () => {
            window.removeEventListener("resize", resizeEventListener);
        }

    }, []);

    return dimensions;

}