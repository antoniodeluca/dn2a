import { Menubar } from "primereact/menubar";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Network } from "./Network";
import { NetworkList } from "./NetworkList";

const Frame = () => {
    const menuVoices = [
        {
            label: "File",
            items: [
                {
                    label: "New",
                    items: [
                        {
                            label: "Project",
                        },
                        {
                            label: "Network",
                        },
                    ],
                },
                {
                    label: "Open",
                    items: [
                        {
                            label: "Project",
                        },
                        {
                            label: "Network",
                        },
                    ],
                },
                {
                    separator: true,
                },
                {
                    label: "Export Project",
                },
            ],
        },
        {
            label: "Configuration",
            items: [
                {
                    label: "List Mode",
                },
                {
                    label: "Pipeline Mode",
                },
            ],
        },
        {
            label: "Training",
        },
        {
            label: "Querying",
        },
        {
            label: "Events",
            items: [
                {
                    label: "List",
                },
                {
                    label: "Emit",
                },
            ],
        },
        {
            label: "Quit",
            icon: "pi pi-fw pi-power-off",
        },
    ];

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const navigate = useNavigate();

    const switchToUIPrototype = () => {
        navigate("/");
    };

    return (
        <>
            <Menubar
                model={menuVoices}
                end={"UI Prototype"}
                style={{ marginBottom: "20px" }}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <NetworkList
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    }
                />
                <Route path="/network" element={<Network />} />
            </Routes>
            <div className="flex justify-content-center">
                <button onClick={switchToUIPrototype}>Switch to UI</button>
            </div>
        </>
    );
};

export { Frame };
