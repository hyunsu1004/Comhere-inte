import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@/app/config/query";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "./index.css";
import { Router } from "./router";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Router></Router>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
