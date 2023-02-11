import { BrainFactory } from "@core/BrainFactory";
import { BrainConfiguration, BrainInterface } from "@core/BrainTypes";
import { CerebrumFactory } from "@core/CerebrumFactory";
import { CerebrumConfiguration, CerebrumInterface } from "@core/CerebrumTypes";

import { NetworkFactory as NetworkAlphaFactory } from "@networks/alpha/NetworkFactory";
import { NeuronFactory as NetworkAlphaNeuronFactory } from "@networks/alpha/NeuronFactory";
import { SynapseFactory as NetworkAlphaSynapseFactory } from "@networks/alpha/SynapseFactory";
import {
    NetworkConfiguration as NetworkAlphaConfiguration,
    NetworkInterface as NetworkAlphaInterface,
    NeuronInterface as NeuronAlphaInterface,
    SynapseInterface as SynapseAlphaInterface,
} from "@networks/alpha/types";
import {
    NeuronConfiguration as NetworkAlphaNeuronConfiguration,
    SynapseConfiguration as NetworkAlphaSynapseConfiguration,
} from "@networks/alpha/types";

import { MathJSCalculator } from "@infrastructure/Calculator/MathJSCalculator";

class DefaultBrain {
    static getInstance(configuration?: BrainConfiguration): BrainInterface {
        const brainFactory = new BrainFactory(
            new MathJSCalculator(),
            configuration
        );
        const brainInstance = brainFactory.getInstance();

        return brainInstance;
    }
}

class DefaultCerebrum {
    static getInstance(
        configuration?: CerebrumConfiguration
    ): CerebrumInterface {
        const cerebrumFactory = new CerebrumFactory(
            new MathJSCalculator(),
            configuration
        );
        const cerebrumInstance = cerebrumFactory.getInstance();

        return cerebrumInstance;
    }
}

class DefaultNetworkAlpha {
    static getInstance(
        configuration?: NetworkAlphaConfiguration
    ): NetworkAlphaInterface {
        const networkAlphaFactory = new NetworkAlphaFactory(
            new MathJSCalculator(),
            configuration
        );
        const networkAlphaInstance = networkAlphaFactory.getInstance();

        return networkAlphaInstance;
    }
}

class DefaultNetworkAlphaNeuron {
    static getInstance(
        configuration?: NetworkAlphaNeuronConfiguration
    ): NeuronAlphaInterface {
        const neuronFactory = new NetworkAlphaNeuronFactory(
            new MathJSCalculator(),
            configuration
        );
        const neuronInstance = neuronFactory.getInstance();

        return neuronInstance;
    }
}

class DefaultNetworkAlphaSynapse {
    static getInstance(
        configuration?: NetworkAlphaSynapseConfiguration
    ): SynapseAlphaInterface {
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
