import type { FC, ReactElement } from "react";
import { useState } from "react";
import { useGetUser } from "@/hooks/data/core";
import Container from "@/pages/Settings/Container";
import Loader from "@/pages/Settings/pages/AccountPassword/Loader";
import Record from "@/pages/Settings/Record";
import Button from "@/components/ui/Button";
import ConfirmPasswordModal from "@/pages/Settings/pages/AccountPassword/ConfirmPasswordModal";
import ChangePasswordModal from "@/pages/Settings/pages/AccountPassword/ChangePasswordModal";
import DeleteAccountModal from "@/pages/Settings/pages/AccountPassword/DeleteAccountModal";

const AccountPassword: FC = (): ReactElement => {

    const { data, status } = useGetUser();
    const [confirmPasswordIsOpen, setConfirmPasswordIsOpen] = useState<boolean>(false);
    const [changePasswordIsOpen, setChangePasswordIsOpen] = useState<boolean>(false);
    const [deleteAccountIsOpen, setDeleteAccountIsOpen] = useState<boolean>(false);
    const [action, setAction] = useState<"password" | "delete" | null>(null);

    const passwordChangeClickHandler = (): void => {
        setConfirmPasswordIsOpen(true);
        setAction("password");
    }

    const deleteAccountClickHandler = (): void => {
        setConfirmPasswordIsOpen(true);
        setAction("delete");
    }

    const onPasswordCorrectHandler = (): void => {

        setConfirmPasswordIsOpen(false);

        if (action === "password") {
            setChangePasswordIsOpen(true);
        } else if (action === "delete") {
            setDeleteAccountIsOpen(true);
        }

    }

    return (
        <>
            <Container>
                {
                    status !== "succeeded"
                        ? <Loader />
                        : (
                            <>
                                <h2>Account & Password</h2>
                                <div className="py-8">
                                    <div className="max-w-2xl flex flex-col gap-y-4 py-4">
                                        <Record title="Username" value={data.login.username} />
                                        <Record title="Email" value={data.login.email} />
                                        <Record title="Phone Number" value={data.login.phoneNumber || "Not set"} />
                                        <Record title="Password" value={
                                            <Button variant="filled" size="sm" onClick={passwordChangeClickHandler}>
                                                Change password
                                            </Button>
                                        } />
                                    </div>
                                </div>
                                <div className="py-8">
                                    <h3 className="mb-2">Delete Account</h3>
                                    <p className="max-w-2xl mb-4">
                                        This will permanently delete your account and all of its data. You will not be
                                        able to reactivate this account.
                                    </p>
                                    <Button variant="filled"
                                            className="bg-red-600 text-base hover:bg-red-700"
                                            onClick={deleteAccountClickHandler}>
                                        Delete your account
                                    </Button>
                                </div>
                            </>
                        )
                }
            </Container>
            <ConfirmPasswordModal isOpen={confirmPasswordIsOpen}
                                  setIsOpen={setConfirmPasswordIsOpen}
                                  onCorrect={onPasswordCorrectHandler} />
            <ChangePasswordModal isOpen={changePasswordIsOpen} setIsOpen={setChangePasswordIsOpen} />
            <DeleteAccountModal isOpen={deleteAccountIsOpen} setIsOpen={setDeleteAccountIsOpen} />
        </>
    );

}

export default AccountPassword;