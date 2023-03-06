import { Menubar } from "primereact/menubar";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EventList } from "./EventList";

import { Network } from "./Network";
import { NetworkCreation } from "./NetworkCreation";
import { NetworkGraph } from "./NetworkGraph";
import { NetworkList } from "./NetworkList";
import { NetworkPipeline } from "./NetworkPipeline";
import { NetworkQuerying } from "./NetworkQuerying";
import { NetworkTraining } from "./NetworkTraining";
import { ProjectCreation } from "./ProjectCreation";
import { ProjectDeployment } from "./ProjectDeployment";
import { ProjectExecution } from "./ProjectExecution";
import { ProjectExportation } from "./ProjectExportation";
import { ProjectSelection } from "./ProjectSelection";

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
                            url: "/prototype/project-creation"
                        },
                        {
                            label: "Network",
                            url: "/prototype/network-creation"
                        },
                    ],
                },
                {
                    label: "Open Project",
                    url: "/prototype/project-selection"
                },
                {
                    separator: true,
                },
                {
                    label: "Export Project",
                    url: "/prototype/project-exportation"
                },
            ],
        },
        {
            label: "View",
            items: [
                {
                    label: "List",
                    url: "/prototype"
                },
                {
                    label: "Pipeline",
                    url: "/prototype/network-pipeline"
                },
                {
                    label: "Graph",
                    url: "/prototype/network-graph"
                },
            ],
        },
        {
            label: "Training",
            url: "/prototype/network-training"
        },
        {
            label: "Querying",
            url: "/prototype/network-querying"
        },
        {
            label: "Events",
            items: [
                {
                    label: "List",
                    url: "/prototype/event-list"
                }
            ],
        },
        {
            label: "Run",
            icon: "pi pi-fw pi-play",
            url: "/prototype/project-execution"
        },
        {
            label: "Deploy",
            icon: "pi pi-fw pi-cloud-upload",
            url: "/prototype/project-deployment"
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
                onClick={(event) => { console.log(event) }}
            />
            <Routes>
                <Route path="/project-creation" element={<ProjectCreation />} />
                <Route path="/network-creation" element={<NetworkCreation />} />
                <Route path="/project-selection" element={<ProjectSelection />} />
                <Route path="/project-exportation" element={<ProjectExportation />} />
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
                <Route path="/network-pipeline" element={<NetworkPipeline />} />
                <Route path="/network-graph" element={<NetworkGraph />} />
                <Route path="/network-training" element={<NetworkTraining />} />
                <Route path="/network-querying" element={<NetworkQuerying />} />
                <Route path="/event-list" element={<EventList />} />
                <Route path="/project-execution" element={<ProjectExecution />} />
                <Route path="/project-deployment" element={<ProjectDeployment />} />
                <Route path="/network/*" element={<Network />} />
            </Routes>
            <div className="flex justify-content-center">
                <button onClick={switchToUIPrototype}>Switch to UI</button>
            </div>
        </>
    );
};

export { Frame };
