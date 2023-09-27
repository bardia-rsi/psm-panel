import type { FC, ReactElement } from "react";
import { useContext } from "react";
import { startCase } from "lodash";
import { ThemeContext } from "@/context/Theme";
import Container from "@/pages/Settings/Container";
import Record from "@/components/Record";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const Appearance: FC = (): ReactElement => {

    const { theme, changeTheme } = useContext(ThemeContext);

    return (
        <Container>
            <h2>Appearance</h2>
            <div className="py-4 flex flex-col gap-y-4">
                <Record title="Theme" value={
                    <Button variant="filled"
                            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>
                        <Icon src={`/icons/${theme === "light" ? "sun" : "moon"}.svg`} />
                        { startCase(theme) }
                    </Button>
                } />
            </div>
        </Container>
    );

}

export default Appearance;