import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client"
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import App from "@/App";

const root: Root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);