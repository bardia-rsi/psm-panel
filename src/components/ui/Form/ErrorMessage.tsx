import type { FC, ReactElement } from "react";
import type { FieldMetaProps } from "formik";
import { useFormikContext } from "formik";

interface Props {
    name: string;
}

const ErrorMessage: FC<Props> = ({ name }): ReactElement | null => {

    const meta: FieldMetaProps<any> = useFormikContext().getFieldMeta(name);
    const error: boolean = Boolean(meta.touched && meta.error);

    return error ? <span className="block text-red-500 text-xs font-bold">{ meta.error }</span> : null;

}

export default ErrorMessage;