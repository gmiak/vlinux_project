import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./screen/home";

const root = ReactDOM.createRoot(document.getElementById('root'));
const dbwebbValidator = false;

root.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>
);
dbwebbValidator ? React() : console.log("Pass");
dbwebbValidator ? Home() : console.log("Pass");
