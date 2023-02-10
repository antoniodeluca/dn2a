import { BrainFactory } from "./core/BrainFactory";
import { CerebrumFactory } from "./core/CerebrumFactory";
import { NetworkAlphaFactory } from "./core/networks/alpha/NetworkAlphaFactory";
import { NeuronFactory as NetworkAlphaNeuronFactory } from "./core/networks/alpha/NeuronFactory";
import { SynapseFactory as NetworkAlphaSynapseFactory } from "./core/networks/alpha/SynapseFactory";
import { MathJSCalculator } from "./infrastructure/Calculator/MathJSCalculator";
import { BrainConfiguration } from "./core/BrainInterface";
import { CerebrumConfiguration } from "./core/CerebrumInterface";
import { NetworkAlphaConfiguration } from "./core/networks/alpha/NetworkAlphaInterface";
import { NeuronConfiguration as NetworkAlphaNeuronConfiguration } from "./core/networks/alpha/NeuronInterface";
import { SynapseConfiguration as NetworkAlphaSynapseConfiguration } from "./core/networks/alpha/SynapseInterface";

class DefaultBrain {
    static getInstance(configuration?: BrainConfiguration) {
        const brainFactory = new BrainFactory(
            new MathJSCalculator(),
            configuration
        );
        const brainInstance = brainFactory.getInstance();

        return brainInstance;
    }
}

class DefaultCerebrum {
    static getInstance(configuration?: CerebrumConfiguration) {
        const cerebrumFactory = new CerebrumFactory(
            new MathJSCalculator(),
            configuration
        );
        const cerebrumInstance = cerebrumFactory.getInstance();

        return cerebrumInstance;
    }
}

class DefaultNetworkAlpha {
    static getInstance(configuration?: NetworkAlphaConfiguration) {
        const networkAlphaFactory = new NetworkAlphaFactory(
            new MathJSCalculator(),
            configuration
        );
        const networkAlphaInstance = networkAlphaFactory.getInstance();

        return networkAlphaInstance;
    }
}

class DefaultNetworkAlphaNeuron {
    static getInstance(configuration?: NetworkAlphaNeuronConfiguration) {
        const neuronFactory = new NetworkAlphaNeuronFactory(
            new MathJSCalculator(),
            configuration
        );
        const neuronInstance = neuronFactory.getInstance();

        return neuronInstance;
    }
}

class DefaultNetworkAlphaSynapse {
    static getInstance(configuration?: NetworkAlphaSynapseConfiguration) {
        const synapseFactory = new NetworkAlphaSynapseFactory(
            new MathJSCalculator(),
            configuration
        );
        const synapseInstance = synapseFactory.getInstance();

        return synapseInstance;
    }
}

export {
    DefaultBrain,
    DefaultCerebrum,
    DefaultNetworkAlpha,
    DefaultNetworkAlphaNeuron,
    DefaultNetworkAlphaSynapse,
};
