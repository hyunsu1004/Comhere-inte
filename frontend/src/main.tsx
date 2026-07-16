import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

WebApp.ready();

if (window.Telegram && window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initData;
    if (initData) {
        localStorage.setItem("telegram_init_data", initData);
        console.log("initData:", initData);
    }
} else {
    console.warn("Telegram WebApp is not available.");
}
