import type { FC, ReactElement } from "react";
import type { DictionaryUnion } from "@/types/Types";
import type { EntityState } from "@/types/App/States";
import type { LoginMeta } from "@/types/Data/Entities/Login";
import type { ComplexityCamelCase } from "@/helpers/password";
import { pickBy, camelCase, startCase } from "lodash";
import { useGetEntity } from "@/hooks/data/entities";
import { complexity, strengthTester } from "@/helpers/password";
import Container from "@/pages/PasswordStrength/Container";
import Loader from "@/pages/PasswordStrength/Logins/Loader";
import Card from "@/pages/PasswordStrength/Logins/Card";

type OrganizedItemsKeys = Exclude<ComplexityCamelCase, "unknown">;

type OrganizedItems = DictionaryUnion<OrganizedItemsKeys, LoginMeta[]>;

const Logins: FC = (): ReactElement => {

    const { items, status } = useGetEntity("logins") as EntityState<LoginMeta, "trash" | "favorite">;

    let organizedItems: OrganizedItems = { veryWeak: [], weak: [], moderate: [], good: [], strong: [] };

    if (status === "succeeded") {

        for (const pid in pickBy(items, item => item.password)) {

            const strength = complexity(strengthTester(items[pid].password!).score);

            organizedItems[camelCase(strength.toString()) as OrganizedItemsKeys].push(items[pid]);

        }

    }

    return (
        <Container className="flex flex-col gap-y-8 bg-transparent py-4 px-0">
            {
                status !== "succeeded"
                    ? <Loader />
                    : (
                        <>
                            {
                                Object.keys(organizedItems).map(key => organizedItems[key as OrganizedItemsKeys].length === 0
                                    ? null
                                    : (
                                        <div key={key}>
                                            <h5 className="mb-2">{ startCase(key) } Passwords</h5>
                                            <div className="flex gap-x-4 overflow-x-auto">
                                                {
                                                    organizedItems[key as OrganizedItemsKeys].map(item => (
                                                        <Card key={item.pid}
                                                              company={item.company}
                                                              subtitle={item.email ||
                                                                  item.username ||
                                                                  item.phoneNumber ||
                                                                  "Not set"}
                                                              password={item.password} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </>
                    )
            }
        </Container>
    )

}

export default Logins;