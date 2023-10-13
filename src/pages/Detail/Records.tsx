import type { FC, ReactElement } from "react";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import { get, startCase } from "lodash";
import Record from "@/pages/Detail/Record";

interface Props {
    item: EntityItemWithType;
    records: string[];
}

const Records: FC<Props> = ({ item, records }): ReactElement => {

    return (
        <>
            {
                records.map(key => {

                    const value: string = get(item, key);
                    const isDateRecord: boolean = ["createdAt", "updatedAt", "lastUsed"].includes(key);

                    return <Record key={key}
                                   title={startCase(key.split(".")[0])}
                                   text={value || "Not Set"}
                                   hover={!isDateRecord}
                                   copy={value ? !isDateRecord : false}
                                   hide={key.toLowerCase().includes("password") || key.includes("cvv")} />;

                })
            }
        </>
    );

}

export default Records;