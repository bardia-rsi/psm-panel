import { useWindowDimensions } from "@/hooks/useWindowDimensions";

export const useSmScreen = (): boolean => 640 > useWindowDimensions().w;