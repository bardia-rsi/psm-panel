import type { FC, ReactElement } from "react";
import type { EntityItemWithType } from "@/types/Data/Entities/Entity";
import { get, last, startCase } from "lodash";
import Record from "@/pages/Detail/Record";

interface Props {
    item: EntityItemWithType;
    recordKey: string;
}

const Footer: FC<Props> = ({ item, recordKey }): ReactElement => (
    <Record title={startCase(last(recordKey.split(".")))}
            text={get(item, recordKey) || "Not Set"} />
);

export default Footer;