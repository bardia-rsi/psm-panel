import { createBrowserRouter } from "react-router-dom";
import Root from "@/pages/Root";
import Items from "@/pages/Items";
import Detail from "@/pages/Detail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: ":type",
                element: <Items />,
                children: [{ path: ":pid/:name", element: <Detail /> }]
            }
        ]
    }
]);