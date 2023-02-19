import { useEffect, useState } from "react";

import { Network, NetworksRetrieverPort } from "../../../../core/types";

const useNetworks = (retrieveNetworks: NetworksRetrieverPort) => {
    const [networks, setNetworks] = useState([] as Network[]);
    useEffect(() => {
        const loadNetworks = async () => {
            const networks = await retrieveNetworks();
            setNetworks(networks);
        };
        loadNetworks();
    }, []);

    return networks;
};

export { useNetworks };
