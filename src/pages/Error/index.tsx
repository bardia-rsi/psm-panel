import type { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import SidebarContextProvider from "@/layouts/Sidebar/Context";
import Sidebar from "@/layouts/Sidebar";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const Error: FC = (): ReactElement => {

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <SidebarContextProvider>
            <Sidebar />
            <motion.div className="w-full max-h-full flex p-8 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween" }}>
                <div className="w-full flex flex-col items-center justify-center gap-y-8">
                    <SVG src="/images/server-down.svg" className="w-full max-w-2xl" />
                    <div className="flex flex-col items-center px-4 md:px-8">
                        <h1 className="text-center capitalize text-3xl sm:text-5xl md:text-6xl mb-1">
                            something went wrong
                        </h1>
                        <p className="text-center capitalize mb-8">
                            We're working to fixing the problem. Please try again.
                        </p>
                        <Button variant="filled" className="[&>svg]:hover:rotate-[360deg]" onClick={refreshPage}>
                            <Icon src="/icons/refresh.svg" className="transition-all duration-500 origin-center" />
                            Refresh Page
                        </Button>
                    </div>
                </div>
            </motion.div>
        </SidebarContextProvider>
    );

}

export default Error;