import { Synapse } from "./Synapse";
import { SynapseConfiguration } from "./SynapseInterface";
 
class SynapseFactory {
    static getInstance(configuration?: SynapseConfiguration) {
        return new Synapse(configuration)
    }
}

export {
    SynapseFactory
}