import type { ToastContextStructure } from "@/components/ui/Toast/Context";
import { useContext } from "react";
import { ToastContext } from "@/components/ui/Toast/Context";

export const useToast = (): ToastContextStructure => useContext<ToastContextStructure>(ToastContext);