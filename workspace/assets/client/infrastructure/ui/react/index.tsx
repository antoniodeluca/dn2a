import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/md-dark-indigo/theme.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const mount = (Application: React.FC) => {
    const applicationContainer = document.getElementById(
        "application-container"
    ) as HTMLElement;
    const applicationRoot = createRoot(applicationContainer);
    applicationRoot.render(
        <BrowserRouter>
            <Application />
        </BrowserRouter>
    );
};

export { mount };
