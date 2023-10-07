import type { ReactNode, Context, FC, ReactElement } from "react";
import { createContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextStructure {
    theme: Theme;
    changeTheme: (theme: Theme) => void;
}

interface Props {
    children: ReactNode;
}

const defaultContext: ThemeContextStructure = {
    theme: (localStorage.getItem("theme") || "light") as Theme,
    changeTheme: () => {}
}

const ThemeContext: Context<ThemeContextStructure> = createContext(defaultContext);

const ThemeContextProvider: FC<Props> = ({ children }): ReactElement => {

    const [theme, setTheme] = useState<Theme>(defaultContext.theme);

    const changeTheme = (theme: Theme): void => {

        setTheme(theme);

        localStorage.setItem("theme", theme);

        document.documentElement.setAttribute("theme", theme);

    }

    useEffect(() => {

        const storedTheme: string | null = localStorage.getItem("theme");

        if (!storedTheme || storedTheme !== "light" && storedTheme !== "dark") {

            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                changeTheme("dark");
            } else {
                changeTheme("light");
            }

        } else {

            setTheme(localStorage.getItem("theme") as Theme);

            document.documentElement.setAttribute("theme", localStorage.getItem("theme") as Theme);

        }

        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", ({ matches }) => {

                if (matches) {
                    changeTheme("dark");
                } else {
                    changeTheme("light")
                }

            });

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === "attributes" && mutation.attributeName === "theme") {

                    const newTheme = document.documentElement.getAttribute("theme");

                    if (newTheme === "light" || newTheme === "dark") {

                        setTheme(newTheme);

                        localStorage.setItem("theme", newTheme);

                    }

                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

    }, []);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            { children }
        </ThemeContext.Provider>
    );

}

export type { Theme };

export { ThemeContext };

export default ThemeContextProvider;