import { DataView } from "primereact/dataview";
import React from "react";

import { Network, NetworksRetrieverPort } from "../../../core/types";
import { useNetworks } from "./hooks/useNetworks";

interface Props {
    retrieveNetworks: NetworksRetrieverPort;
}

const Application = (props: Props) => {
    const { retrieveNetworks } = props;
    const networks = useNetworks(retrieveNetworks);

    const networkTemplate = (network: Network) => {
        return <div className="col-12 p-3 m-1">{network.name}</div>;
    };

    return <DataView value={networks} itemTemplate={networkTemplate} />;
};

export { Application };
