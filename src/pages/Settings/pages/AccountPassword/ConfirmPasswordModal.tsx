import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import { authApi } from "@/api";
import { checkPasswordSchema } from "@/schemas/password";
import { useToast } from "@/hooks/useToast";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form/Form";
import Row from "@/components/ui/Form/Row";
import Group from "@/components/ui/Form/Group";

interface FormValues {
    password: string;
}

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onCorrect: () => void;
}

const ConfirmPasswordModal: FC<Props> = ({ isOpen, setIsOpen, onCorrect }): ReactElement => {

    const { addToast } = useToast();

    const submitHandler = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
        try {

            formikHelpers.setSubmitting(true);

            const res = await authApi.post<boolean>("/password/check", values);

            if (res.data) {
                onCorrect();
            } else {

                addToast({
                    type: "danger",
                    content: "Incorrect password. Please try again"
                });

                formikHelpers.resetForm();

            }

        } catch (e) {
            addToast({
                type: "danger",
                content: "Something went wrong!"
            });
        }
    }

    return (
        <Modal isOpen={isOpen}
               setIsOpen={() => setIsOpen(false)}
               title="Enter your password"
               className="min-w-[24rem]">
            <Form initialValues={{ password: "" }}
                  validationSchema={checkPasswordSchema}
                  onSubmit={submitHandler}
                  form={{ className: "mt-8 gap-y-8" }}
                  button={{ text: "Authenticate", full: true }}>
                <Row>
                    <Group name="password" type="password" autoComplete="off" />
                </Row>
            </Form>
        </Modal>
    );

}

export default ConfirmPasswordModal;