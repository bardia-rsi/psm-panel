import { createBrowserRouter } from "react-router-dom";
import Root from "@/pages/Root";
import Items from "@/pages/Items";
import Detail from "@/pages/Detail";
import PasswordStrength from "@/pages/PasswordStrength";
import Settings from "@/pages/Settings";
import AccountPassword from "@/pages/Settings/pages/AccountPassword";
import UpgradePlan from "@/pages/Settings/pages/UpgradePlan";
import Appearance from "@/pages/Settings/pages/Appearance";
import NotFound from "@/pages/NotFound";
import Error from "@/pages/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: ":type",
                element: <Items />,
                children: [{ path: ":pid/:name", element: <Detail /> }]
            },
            {
                path: "passwords-strength",
                element: <PasswordStrength />
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    { path: "account-password", element: <AccountPassword /> },
                    { path: "upgrade", element: <UpgradePlan /> },
                    { path: "appearance", element: <Appearance /> }
                ]
            },
            { path: "*", element: <NotFound /> }
        ],
        errorElement: <Error />
    }
]);