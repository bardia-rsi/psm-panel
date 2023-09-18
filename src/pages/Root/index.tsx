import type { FC, ReactElement } from "react";
import ThemeContextProvider from "@/context/Theme";

const Root: FC = (): ReactElement => (
    <ThemeContextProvider>
        Hello World!
    </ThemeContextProvider>
);

export default Root;