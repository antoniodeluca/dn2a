interface Network {
    name: string;
}

type NetworksRetrieverPort = () => Promise<Network[]>;

export { Network, NetworksRetrieverPort };
