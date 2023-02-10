import { Calculator } from "../CalculatorInterface";
import { NetworkAlpha } from "./NetworkAlpha";
import {
    DataRepository,
    NetworkAlphaConfiguration,
} from "./NetworkAlphaInterface";
import { NeuronFactory } from "./NeuronFactory";
import { SynapseFactory } from "./SynapseFactory";

class NetworkAlphaFactory {
    private calculator: Calculator;

    private configuration: NetworkAlphaConfiguration;

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
        } as NetworkAlphaConfiguration;
    }

    constructor(
        calculator: Calculator,
        configuration?: NetworkAlphaConfiguration
    ) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: NetworkAlphaConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new NetworkAlpha(this.calculator, this.configuration);
    }
}

export { NetworkAlphaFactory };
