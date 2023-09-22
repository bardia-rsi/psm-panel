import type { ReactNode, FormHTMLAttributes, ReactElement } from "react";
import type { FormikConfig, FormikValues } from "formik";
import type { Props as SubmitButtonProps } from "@/components/ui/Form/SubmitButton";
import { Formik, Form as FormikForm } from "formik";
import cn from "classnames";
import { omit } from "lodash";
import Row from "@/components/ui/Form/Row";
import SubmitButton from "@/components/ui/Form/SubmitButton";

interface Props {
    form?: FormHTMLAttributes<any>;
    button?: SubmitButtonProps;
    children: ReactNode;
}

type FormComponent = <Values extends FormikValues>(props: FormikConfig<Values> & Props) => ReactElement;

const Form: FormComponent = ({ form, button, children, ...props }): ReactElement => (
    <Formik {...props}>
        <FormikForm className={cn("max-w-3xl flex flex-col flex-wrap gap-y-4 mx-auto", form?.className)}
                    {...omit(form, "className")}>
            { children }
            <Row>
                <SubmitButton {...button} />
            </Row>
        </FormikForm>
    </Formik>
);

export default Form;