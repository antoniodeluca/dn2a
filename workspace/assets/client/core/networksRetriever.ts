import { NetworksRetrieverPort } from "./types";

const networksRetriever =
    (retrieveNetworks: NetworksRetrieverPort) => async () => {
        const networks = await retrieveNetworks();

        return networks;
    };

export { networksRetriever };
