import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import { dataApi } from "@/api";
import { changePasswordSchema } from "@/schemas/password";
import { useToast } from "@/hooks/useToast";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form/Form";
import Row from "@/components/ui/Form/Row";
import Group from "@/components/ui/Form/Group";

interface FormValues {
    password: string;
    passwordConfirmation: string;
}

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordModal: FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {

    const { addToast } = useToast();

    const submitHandler = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
        try {

            formikHelpers.setSubmitting(true);

            await dataApi.put("/data/user", {
                login: {
                    password: {
                        current: {
                            content: values.password
                        },
                        repeated: values.passwordConfirmation
                    }
                }
            });

            addToast({
                type: "success",
                content: "Password changed successfully."
            });

            setIsOpen(false);


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
               title="Change password"
               className="sm:min-w-[24rem]">
            <Form initialValues={{ password: "", passwordConfirmation: "" }}
                  validationSchema={changePasswordSchema}
                  onSubmit={submitHandler}
                  form={{ className: "mt-8 gap-y-8" }}
                  button={{ text: "Change", full: true }}>
                <Row>
                    <Group name="password" label="New Password" type="password" autoComplete="off" />
                </Row>
                <Row>
                    <Group name="passwordConfirmation" label="Confirm Password" type="password" autoComplete="off" />
                </Row>
            </Form>
        </Modal>
    );

}

export default ChangePasswordModal;