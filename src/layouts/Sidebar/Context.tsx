import type { ReactNode, Dispatch, SetStateAction, FC, ReactElement, Context } from "react";
import { createContext, useState } from "react";

interface Props {
    children: ReactNode;
}

interface SidebarContextStructure {
    visibility: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>;
}

const defaultSidebarContext: SidebarContextStructure = {
    visibility: false,
    setVisibility: () => {}
}

const SidebarContext: Context<SidebarContextStructure> = createContext(defaultSidebarContext);

const SidebarContextProvider: FC<Props> = ({ children }): ReactElement => {

    const [visibility, setVisibility] = useState<boolean>(defaultSidebarContext.visibility);

    return (
        <SidebarContext.Provider value={{ visibility, setVisibility }}>
            { children }
        </SidebarContext.Provider>
    );

}

export type { SidebarContextStructure };

export { SidebarContext };

export default SidebarContextProvider;