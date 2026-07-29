import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./styles/global.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/button.css";
import "./styles/form.css";
import "./styles/table.css";
import "./styles/card.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
);