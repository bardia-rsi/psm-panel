import type { Dispatch, SetStateAction, FC, ReactElement } from "react";
import type { FormikHelpers } from "formik";
import { dataApi } from "@/api";
import { logout } from "@/helpers/token";
import { accountDeletionSchema } from "@/schemas/user";
import { useToast } from "@/hooks/useToast";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form/Form";
import Row from "@/components/ui/Form/Row";
import Group from "@/components/ui/Form/Group";

interface FormValues {
    reason: string;
    feedback: string;
    confirmation: boolean;
}

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordModal: FC<Props> = ({ isOpen, setIsOpen }): ReactElement => {

    const { addToast } = useToast();

    const submitHandler = async (_: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
        try {

            formikHelpers.setSubmitting(true);

            const res = await dataApi.delete("/data/user");

            if (res.status === 204) {

                setIsOpen(false);

                logout();

                window.location.href = import.meta.env.VITE_WEBSITE_URL;

            } else {
                addToast({
                    type: "danger",
                    content: "Something went wrong!"
                });
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
               title="Delete account"
               className="sm:min-w-[24rem]">
            <div className="border-l-2 border-l-orange-500 pl-2 mt-4">
                <h3 className="text-base uppercase">
                    warning: deletion in permanent. all your data will be gone.
                </h3>
            </div>
            <Form initialValues={{ reason: "", feedback: "", confirmation: false }}
                  validationSchema={accountDeletionSchema}
                  onSubmit={submitHandler}
                  form={{ className: "mt-8 gap-y-4" }}
                  button={{ text: "Delete", full: true, className: "bg-red-600 hover:bg-red-700" }}>
                <Row className="!flex-col">
                    <p className="text-primary font-bold -mb-2">
                        What is the main reason you are deleting your account?
                    </p>
                    <Group as="select" name="reason" label="Select a reason" select={{ labels: [
                        "I use a different PSM account",
                        "It's missing a key feature that I need",
                        "I found another service that I like better",
                        "My reason isn't listed"
                        ] }} />
                </Row>
                <Row className="!flex-col">
                    <p className="block text-primary font-bold -mb-2">
                        We are sorry to see you go. Please explain why you are leaving to help us improve.
                    </p>
                    <Group as="textarea" name="feedback" label="Feedback" />
                </Row>
                <Row>
                    <Group name="confirmation"
                           label="Yes, I want to permanently delete this account and all its data."
                           type="checkbox"
                    />
                </Row>
            </Form>
        </Modal>
    );

}

export default ChangePasswordModal;