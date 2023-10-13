import type { EntityStates } from "@/types/App/DataTypes";
import { createBrowserRouter } from "react-router-dom";
import { kebabCase } from "lodash";
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

const entityPages: EntityStates[] = [
    "allItems", "trash", "favorites", "logins", "contacts", "paymentCards", "wifiPasswords"
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            ...entityPages.map(stateName => ({
                path: kebabCase(stateName),
                element: <Items page={stateName} />,
                children: [{ path: ":pid", element: <Detail page={stateName} /> }]
            })),
            {
                path: "passwords-strength",
                element: <PasswordStrength />
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    { path: "account", element: <AccountPassword /> },
                    { path: "upgrade-plan", element: <UpgradePlan /> },
                    { path: "appearance", element: <Appearance /> }
                ]
            },
            { path: "*", element: <NotFound /> }
        ],
        errorElement: <Error />
    }
]);