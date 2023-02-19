import { Network, NetworksRetrieverPort } from "../../core/types";

const networkListEndpoint = "http://localhost:3000/networks";

interface SourceNetwork {
    id: number;
    name: string;
}

const retrieveNetworks: NetworksRetrieverPort = async () => {
    const response = await fetch(networkListEndpoint);
    const sourceNetworks = (await response.json()) as SourceNetwork[];
    const images = sourceNetworks.map((sourceNetwork) => {
        const { name } = sourceNetwork;

        return {
            name,
        };
    }) as Network[];

    return images;
};

export { retrieveNetworks };
