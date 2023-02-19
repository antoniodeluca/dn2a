import React from "react";

import { networksRetriever } from "./core/networksRetriever";
import { retrieveNetworks as httpNetworksRetrieverAdapter } from "./infrastructure/dataSource/http";
import { mount } from "./infrastructure/ui/react";
import { Application } from "./infrastructure/ui/react/Application";

const composedNetworksRetriever = networksRetriever(
    httpNetworksRetrieverAdapter
);

const services = {
    mount,
    retrieveNetworks: composedNetworksRetriever,
};

const ComposedApplication = () => {
    return <Application retrieveNetworks={composedNetworksRetriever} />;
};

const components = {
    Application: ComposedApplication,
};

export { components, services };
