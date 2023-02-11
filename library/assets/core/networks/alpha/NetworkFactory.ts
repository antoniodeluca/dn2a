import { Calculator } from "@networks/types";

import { Network } from "./Network";
import { NeuronFactory } from "./NeuronFactory";
import { SynapseFactory } from "./SynapseFactory";
import { DataRepository, NetworkConfiguration } from "./types";

class NetworkFactory {
    private calculator: Calculator;

    private configuration: NetworkConfiguration;

    private getDefaultConfiguration() {
        const neuronFactory = new NeuronFactory(this.calculator);
        const synapseFactory = new SynapseFactory(this.calculator);

        return {
            layerDimensions: [2, 4, 1],
            learningMode: "continuous",
            learningRate: 0.3,
            momentumRate: 0.7,
            maximumError: 0.005,
            maximumEpoch: 1000,
            dataRepository: { neuronLayers: [] } as DataRepository,
            neuron: {
                generator: neuronFactory,
            },
            synapse: {
                generator: synapseFactory,
            },
        } as NetworkConfiguration;
    }

    constructor(calculator: Calculator, configuration?: NetworkConfiguration) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: NetworkConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new Network(this.calculator, this.configuration);
    }
}

export { NetworkFactory };
