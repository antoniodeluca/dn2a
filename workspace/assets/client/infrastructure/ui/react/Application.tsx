import React from "react";
import { DataView } from "primereact/dataview";
import { useNetworks } from "./hooks/useNetworks";
import { Network, NetworksRetrieverPort } from "../../../core/types";

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
