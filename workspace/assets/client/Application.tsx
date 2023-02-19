import React, { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";

const networksEndpoint = "http://localhost:3000/networks";

const Application = () => {
    const [networks, setNetworks] = useState([]);

    useEffect(() => {
        const loadNetworks = async () => {
            const response = await fetch(networksEndpoint);
            const networks = await response.json();
            setNetworks(networks);
        };
        loadNetworks();
    }, []);

    const networkTemplate = (network: any) => {
        return <div className="col-12 p-3 m-1">{network.name}</div>;
    };

    return (
        <DataView value={networks} itemTemplate={networkTemplate} />
    );
};

export { Application };
