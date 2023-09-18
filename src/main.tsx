import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/app/store";
import { router } from "@/routes";
import "@/styles/index.css";

const root: Root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);