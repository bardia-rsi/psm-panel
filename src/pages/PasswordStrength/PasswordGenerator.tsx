import type { FC, ReactElement, ChangeEvent } from "react";
import type { DictionaryUnion } from "@/types/Types";
import type { CharTypes } from "@/helpers/password";
import { useState } from "react";
import { chunk } from "lodash";
import cn from "classnames";
import { generate, strengthTester } from "@/helpers/password";
import { useToast } from "@/hooks/useToast";
import Container from "@/pages/PasswordStrength/Container";
import Strength from "@/pages/PasswordStrength/Strength";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Form from "@/components/ui/Form/Form";
import Group from "@/components/ui/Form/Group";
import Row from "@/components/ui/Form/Row";

const checkboxes: { label: string; value: CharTypes }[] = [
    { label: "Lowercase Letters", value: "lowers" },
    { label: "Uppercase Letters", value: "uppers" },
    { label: "Numbers", value: "nums" },
    { label: "Symbols", value: "symbols" }
];

interface PasswordConfiguration extends DictionaryUnion<CharTypes, boolean> {
    lowers: boolean;
    uppers: boolean;
    nums: boolean;
    symbols: boolean;
}

const initialValues: PasswordConfiguration = {
    lowers: true,
    uppers: true,
    nums: true,
    symbols: true,
}

const selectedCharTypes = (types: DictionaryUnion<CharTypes, boolean>): CharTypes[] => {
    return (Object.keys(types) as CharTypes[]).filter(type => types[type]);
};

const PasswordGenerator: FC = (): ReactElement => {

    const [password, setPassword] = useState<string>(generate());
    const [length, setLength] = useState<number>(24);
    const { addToast } = useToast();

    const copyText = (text: string): void => {
        navigator.clipboard.writeText(text)
            .then(() => addToast({
                content: "The password successfully copied in your clipboard.",
                type: "custom",
                className: "bg-ac-primary-500"
            }))
            .catch(() => addToast({
                content: "Something went wrong",
                type: "danger"
            }));
    }

    const rangeHandler = (e: ChangeEvent<HTMLInputElement>) => setLength(Number(e.target.value));

    return (
        <Container className="w-full lg:w-1/2 flex flex-col gap-y-2">
            <h5>Password Generator</h5>
            <div className="flex items-center gap-x-2 bg-tertiary pl-4 pr-2 pt-2 pb-3 mb-2 rounded-md relative">
                <p className="flex-1 text-primary whitespace-nowrap overflow-x-auto">{ password }</p>
                <Strength score={strengthTester(password).score} className="absolute bottom-0 left-0 right-0" />
                <Tooltip content="Copy">
                    <Button variant="custom"
                            className={cn(
                                "p-1 border-transparent",
                                "[&>svg>*]:fill-secondary [&>svg>*]:hover:fill-primary"
                            )}
                            onClick={() => copyText(password)}>
                        <Icon src={`/icons/copy.svg`} />
                    </Button>
                </Tooltip>
            </div>
            <Form initialValues={initialValues}
                  form={{ className: "!max-w-none !mx-0" }}
                  button={{ full: true, text: "Generate" }}
                  onSubmit={(values, formikHelpers) => {

                      formikHelpers.setSubmitting(false);

                      if (selectedCharTypes(values).length === 0) {
                          addToast({
                              content: "You must select at least one character type",
                              type: "danger"
                          })
                      } else {
                          setPassword(generate(length, selectedCharTypes(values)))
                      }

                  }}>
                {
                    chunk(checkboxes, 2).map((row, index) => (
                        <Row key={index} breakpoint="xs">
                            {
                                row.map(({ value, label }) => (
                                    <Group key={value}
                                           name={value}
                                           label={label}
                                           type="checkbox"
                                           defaultChecked />
                                ))
                            }
                        </Row>
                    ))
                }
                <div className="p-1">
                    <span className="text-primary">Length: { length }</span>
                    <input type="range"
                           min="4"
                           max="72"
                           value={length}
                           onChange={rangeHandler}
                           style={{ backgroundSize: `${(length - 4) * 100 / (72 - 4)}% 100%` }} />
                </div>
            </Form>
        </Container>
    );

}

export default PasswordGenerator;