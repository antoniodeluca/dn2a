import "primereact/resources/primereact.css";
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import React from "react";
import { createRoot } from "react-dom/client";

const mount = (Application: React.FC) => {
    const applicationContainer = document.getElementById(
        "application-container"
    ) as HTMLElement;
    const applicationRoot = createRoot(applicationContainer);
    applicationRoot.render(<Application />);
};

export { mount };
