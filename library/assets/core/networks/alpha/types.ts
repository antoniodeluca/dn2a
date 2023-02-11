import { NetworkInterface } from "@networks/types";

import { NeuronFactory } from "./NeuronFactory";
import { SynapseFactory } from "./SynapseFactory";

interface DataRepository {
    neuronLayers: NeuronInterface[][];
}

interface NetworkAlphaInterface extends NetworkInterface {
    dataRepository: DataRepository;
}

interface NetworkConfiguration {
    layerDimensions: number[];
    learningMode: "continuous" | "stepatgoal" | "stepbystep";
    learningRate: number;
    momentumRate: number;
    maximumError: number;
    maximumEpoch: number;
    dataRepository: DataRepository;
    neuron: {
        generator: NeuronFactory;
        configuration?: NeuronConfiguration;
    };
    synapse: {
        generator: SynapseFactory;
        configuration?: SynapseConfiguration;
    };
}

interface NeuronInterface {
    delta: number;

    expectedOutput: number;

    fixed: boolean;

    incomingConnections: SynapseInterface[];

    inputSum: number;

    inputs: number[];

    outgoingConnections: SynapseInterface[];

    output: number;

    outputError: number;

    previousExpectedOutput: number;

    previousIncomingConnections: SynapseInterface[];

    previousInputSum: number;

    previousInputs: number[];

    previousOutgoingConnections: SynapseInterface[];

    previousOutput: number;

    previousOutputError: number;

    proxy: boolean;

    transferFunction: (value: number) => number;

    addIncomingConnection: (value: SynapseInterface) => void;

    addOutgoingConnection: (value: SynapseInterface) => void;

    addPreviousIncomingConnection: (value: SynapseInterface) => void;

    addPreviousOutgoingConnection: (value: SynapseInterface) => void;
}

interface NeuronConfiguration {
    transferFunction?: (value: number) => number;
}

interface SynapseInterface {
    incomingConnection: NeuronInterface;

    outgoingConnection: NeuronInterface;

    previousIncomingConnection: NeuronInterface;

    previousOutgoingConnection: NeuronInterface;

    previousWeight: number;

    previousWeightChange: number;

    weight: number;

    weightChange: number;
}

interface SynapseConfiguration {
    initializationFunction?: () => number;
}

export {
    DataRepository,
    NetworkAlphaInterface as NetworkInterface,
    NetworkConfiguration,
    NeuronConfiguration,
    NeuronInterface,
    SynapseConfiguration,
    SynapseInterface,
};
