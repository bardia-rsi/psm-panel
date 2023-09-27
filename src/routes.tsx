import { createBrowserRouter } from "react-router-dom";
import Root from "@/pages/Root";
import Items from "@/pages/Items";
import Detail from "@/pages/Detail";
import PasswordStrength from "@/pages/PasswordStrength";
import Settings from "@/pages/Settings";
import AccountPassword from "@/pages/Settings/pages/AccountPassword";
import Appearance from "@/pages/Settings/pages/Appearance";

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
                    { path: "appearance", element: <Appearance /> }
                ]
            }
        ]
    }
]);