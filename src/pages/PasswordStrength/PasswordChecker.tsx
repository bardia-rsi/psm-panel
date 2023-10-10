import type { FC, ReactElement, ChangeEvent } from "react";
import type { Complexity, Strength } from "@/helpers/password";
import { useState } from "react";
import { pickBy } from "lodash";
import { strengthTester, complexity as getComplexity, getColor } from "@/helpers/password";
import Container from "@/pages/PasswordStrength/Container";
import StrengthBar from "@/pages/PasswordStrength/Strength";
import PasteButton from "@/components/PasteButton";

const PasswordChecker: FC = (): ReactElement => {

    const [password, setPassword] = useState<string>("");
    const [strength, setStrength] = useState<Strength>(strengthTester(password))
    const [complexity, setComplexity] = useState<Complexity>(getComplexity(strength.score))

    const onTextPasted = (text: string): void => {

        const strength = strengthTester(text);

        setPassword(text);
        setStrength(strength);
        setComplexity(getComplexity(strength.score));

    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {

        const strength = strengthTester(e.target.value);

        setPassword(e.target.value);
        setStrength(strength);
        setComplexity(getComplexity(strength.score));

    }

    return (
        <Container className="w-full lg:w-1/2">
            <h5>Check Your Password</h5>
            <div className="flex items-center gap-x-2 bg-tertiary px-2 pb-2 my-2 rounded-md relative">
                <input type="text"
                       className="py-2 px-4 text-primary"
                       onChange={changeHandler}
                       placeholder="Type or paste your password"
                       value={password} />
                <StrengthBar className="absolute bottom-0 left-0 right-0" score={strength.score} />
                <PasteButton title="password" onTextPasted={onTextPasted} />
            </div>
            {
                complexity !== "unknown" && password !== "" && (
                    <>
                        <p className="text-primary">
                            Your password is
                            {"\n"}
                            <b className={getColor(complexity, false)}>{ complexity }</b>
                        </p>
                        {
                            strength.details &&
                            Object.keys(pickBy(strength.details.additions, v => v === 0)).length > 0 && (
                                <>
                                    <hr />
                                    <p className="text-primary font-bold">To improve your password:</p>
                                    <div className="p-2">
                                        { !(strength.details.additions.lowers) && <p>- Add lowercase letters. (a-z)</p> }
                                        { !(strength.details.additions.uppers) && <p>- Add uppercase letters. (A-Z)</p> }
                                        { !(strength.details.additions.numbers) && <p>- Add numbers. (0-9)</p> }
                                        { !(strength.details.additions.symbols) && <p>- Add Symbols. (e.g. !@#)</p> }
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
        </Container>
    );

}

export default PasswordChecker;