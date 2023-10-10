import type { FC, ReactElement } from "react";
import type { Company } from "@/types/Data/Entities/Company";
import { useState } from "react";
import { strengthTester } from "@/helpers/password";
import Logo from "@/components/Logo";
import VisibilityButton from "@/components/VisibilityButton";
import CopyButton from "@/components/CopyButton";
import Strength from "@/pages/PasswordStrength/Strength";

interface Props {
    company: Company;
    subtitle: string;
    password: string;
}

const Card: FC<Props> = ({ company, subtitle, password }): ReactElement => {

    const [visibility, setVisibility] = useState<boolean>(false);


    return (
        <div className="min-w-[300px] max-w-[300px] bg-secondary flex flex-col gap-y-4 p-4 rounded-md">
            <div className="flex items-center gap-x-2">
                <Logo size="md"
                      src={company.logo}
                      name={!company.logo ? company.name : undefined}
                      colors={company.colors} />
                <div className="flex flex-col flex-1 justify-around overflow-hidden">
                    <p className="text-primary text-lg font-bold whitespace-nowrap text-ellipsis overflow-hidden">
                        { company.name }
                    </p>
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                        { subtitle }
                    </p>
                </div>
            </div>
            <div className="w-full bg-tertiary flex items-center gap-x-1 pt-2 pb-4 pl-2 pr-1 rounded-md relative">
                <p className="w-full text-primary whitespace-nowrap overflow-x-auto">
                    { visibility ? password : String("•").repeat(password.length) }
                </p>
                <VisibilityButton visibility={visibility} setVisibility={setVisibility} />
                <CopyButton title="password" value={password} />
                <Strength score={strengthTester(password).score} className="absolute bottom-0 left-0 right-0" />
            </div>
        </div>
    );

}

export default Card;