import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export const useSmScreen = (): boolean => 640 > useWindowDimensions().w;

export const useLgScreen = (): boolean => 1024 > useWindowDimensions().w;