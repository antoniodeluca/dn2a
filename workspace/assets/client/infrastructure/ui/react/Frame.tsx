import React from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Network, NetworksRetrieverPort } from "../../../core/types";
import { NetworkList } from "./NetworkList";
import { useNetworks } from "./hooks/useNetworks";

interface Props {
    retrieveNetworks: NetworksRetrieverPort;
}

const Frame = (props: Props) => {
    const { retrieveNetworks } = props;
    const networks = useNetworks(retrieveNetworks);
    const navigate = useNavigate();

    const networkTemplate = (network: Network) => {
        return <div className="col-12 p-3 m-1">{network.name}</div>;
    };

    const switchToUIPrototype = () => {
        navigate("/prototype");
    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <NetworkList
                            networks={networks}
                            networkTemplate={networkTemplate}
                        />
                    }
                />
            </Routes>
            <div className="flex justify-content-center">
                <button onClick={switchToUIPrototype}>
                    Switch to UI Prototype
                </button>
            </div>
        </>
    );
};

export { Frame };
