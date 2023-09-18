import type { FC, ReactElement } from "react";
import type { LinkProps } from "react-router-dom";
import type { LinkVariants, Sizes } from "@/types/Theme/Properties";
import { Link as RouterLink } from "react-router-dom";
import cn from "classnames";
import { spaces, sizes } from "@/components/ui/Button/styles";
import { styles } from "@/components/ui/Link/styles";

interface Props extends LinkProps {
    variant: LinkVariants;
    size?: Sizes;
    full?: boolean;
    compact?: boolean;
}

const Link: FC<Props> = ({ variant, size = "md", full, compact, children, className, ...rest }): ReactElement => (
    <RouterLink className={cn(
        "flex justify-center items-center rounded-md font-semibold",
        variant === "link" ? "border-b-2 border-b-transparent" : "border-2",
        styles[variant],
        sizes[size],
        compact ? spaces.compact[size] : spaces.normal[size],
        full && "w-full",
        className
    )} {...rest}>
        { children }
    </RouterLink>
);

export default Link;