import type { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { upperFirst } from "lodash";
import { useFetchUser } from "@/hooks/data/core";
import Loader from "@/pages/Settings/Loader";
import MenuItem from "@/components/ui/Menu/Item";
import Icon from "@/components/ui/Icon";

const Settings: FC = (): ReactElement => {

    const { data, status } = useFetchUser();
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/settings") {
        navigate("account-password");
    }

    return (
        <motion.nav className="w-1/6 p-4 border-l-2 border-l-primary bg-secondary overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "twean" }}>
            {
                status !== "succeeded"
                    ? <Loader />
                    : (
                        <>
                            <div className="flex gap-x-2 items-center mb-4">
                                <div className="w-16 h-16 flex items-center justify-center bg-tertiary rounded-full">
                                    <Icon src="/icons/user.svg" w={2.25} h={2.25} className="[&>*]:fill-secondary" />
                                </div>
                                <div className="flex flex-1 flex-col justify-evenly">
                                    <h3 className="text-2xl">@{upperFirst(data.login.username)}</h3>
                                    <p>{data.subscription.plan} plan</p>
                                </div>
                            </div>
                            <p>Account</p>
                            <ul>
                                <MenuItem to="account-password" text="Account & Password"
                                          icon={{ src: "/icons/user.svg" }} />
                                <MenuItem to="upgrade" text="Upgrade Plan" icon={{ src: "/icons/user.svg" }} />
                                <MenuItem to="appearance" text="Apppearance" icon={{ src: "/icons/user.svg" }} />
                            </ul>
                        </>
                    )
            }
        </motion.nav>
    );

}

export default Settings;