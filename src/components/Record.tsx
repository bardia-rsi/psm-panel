import type { ReactElement, FC } from "react";

interface Props {
    title: string;
    value: string | ReactElement;
}

const Record: FC<Props> = ({ title, value }): ReactElement => (
    <div className="flex items-center gap-x-4">
        <p className="w-1/2 text-primary font-bold">{ title }</p>
        <p className="w-1/2">{ value }</p>
    </div>
);

export default Record;