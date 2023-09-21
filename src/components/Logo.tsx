import type { FC, ReactElement } from "react";
import type { Company } from "@/types/Data/Entities/Company";
import { useContext } from "react";
import styled from "styled-components";
import cn from "classnames";
import { ThemeContext } from "@/context/Theme";
import Icon from "@/components/ui/Icon";

type Color = string | null;

interface Props extends Partial<Pick<Company, "colors" | "name">> {
    src?: string;
    local?: string;
    size: "md" | "lg";
    className?: string;
}

const LogoWrapper = styled.div<{ color: Color }>`
  background-color: ${({ color }) => color};
`;

const DynamicLogo = styled(Icon)<{ color: Color }>`
  ${({ color }) => color === null ? "" : `& > * { fill: ${color}; }`}
`;

const Logo: FC<Props> = ({ src, local, size, colors, name, className }): ReactElement => {

    const { theme } = useContext(ThemeContext);

    return (
        <LogoWrapper color={colors?.bg[theme] ?? "rgb(var(--bg-tertiary))"}
                     className={cn(
                         "flex justify-center items-center rounded-lg",
                         size === "lg"
                             ? "min-w-[4rem] xs:min-w-[5rem] min-h-[4rem] xs:min-h-[5rem]"
                             : "min-w-[3.5rem] min-h-[3.5rem]",
                         className
                     )}>
            { src || local
                ? <DynamicLogo src={
                    src && !local
                        ? src.startsWith("http")
                            ? src
                            : `http://media.localhost:8000${src}`
                        : local as string
                }
                               color={colors === undefined ? "rgb(var(--ic-primary))" : colors.logo[theme]}
                               className={size === "lg" ? "!w-10 xs:!w-12 !h-10 xs:!h-12" : "!w-8 !h-8"}
                />
                : (
                    <h3 className={cn("font-bold", size === "md" ? "text-xl" : "text-4xl")}>
                        { name!.split(" ").map(w => w[0]).join("").toUpperCase() }
                    </h3>
                )
            }
        </LogoWrapper>
    );

}

export type { Props };

export default Logo;