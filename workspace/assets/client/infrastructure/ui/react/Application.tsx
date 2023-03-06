import React from "react";
import { Route, Routes } from "react-router-dom";

import { NetworksRetrieverPort } from "@assets/client/core/types";

import { Frame } from "./Frame";
import { Frame as PrototypeFrame } from "./prototype/Frame";

interface Props {
    retrieveNetworks: NetworksRetrieverPort;
}

const Application = (props: Props) => {
    const { retrieveNetworks } = props;

    return (
        <Routes>
            <Route
                path="/*"
                element={<Frame retrieveNetworks={retrieveNetworks} />}
            />
            <Route path="/prototype/*" element={<PrototypeFrame />} />
        </Routes>
    );
};

export { Application };
