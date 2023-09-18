import type { ButtonHTMLAttributes, ReactNode, ReactElement } from "react";
import type { Variants, Sizes } from "@/types/Theme/Properties";
import { forwardRef } from "react";
import cn from "classnames";
import { styles, spaces, sizes } from "@/components/ui/Button/styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: Variants | "custom";
    size?: Sizes;
    full?: boolean;
    compact?: boolean;
    children: Exclude<ReactNode, undefined | null>;
}

const Button = forwardRef<HTMLButtonElement, Props>((
    { variant, size = "md", full, compact, children, className, ...rest },
    ref
): ReactElement => (
    <button className={cn(
        "flex justify-center items-center border-2 rounded-md outline-none font-semibold",
        variant !== "custom" && sizes[size],
        variant !== "custom" && styles[variant],
        variant !== "custom" && (compact ? spaces.compact[size] : spaces.normal[size]),
        full && "w-full",
        className
    )}
            ref={ref}
            {...rest}>
        { children }
    </button>
));

export type { Props };

export default Button;