import type { RefObject } from "react";
import { useEffect } from "react";

export const useSticky = (
    ref: RefObject<HTMLElement>,
    callback: (isSticky: boolean) => void,
    options: IntersectionObserverInit = { threshold: 1 }
): void => {
    useEffect(()=>{
        if (ref.current) {

            const element = ref.current;

            const observer = new IntersectionObserver(
                entries => callback(entries[0].intersectionRatio < 1),
                options
            );

            observer.observe(element);

            return () => {
                observer.unobserve(element)
            }
        }
    }, [ref, options])
}