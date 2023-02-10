import { QueryingStatus, TrainingStatus } from "../../InputOutputInterface";
import { NetworkInterface } from "../NetworkInterface";
import { NeuronFactory } from "./NeuronFactory";
import { NeuronConfiguration, NeuronInterface } from "./NeuronInterface";
import { SynapseFactory } from "./SynapseFactory";
import { SynapseConfiguration } from "./SynapseInterface";

interface DataRepository {
    neuronLayers: NeuronInterface[][];
}

interface NetworkAlphaInterface extends NetworkInterface {
    dataRepository: DataRepository;
}

interface NetworkAlphaConfiguration {
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

type TrainingEpochCallback = (trainingStatus: TrainingStatus) => void;

type TrainingIterationCallback = (trainingStatus: TrainingStatus) => void;

type QueryingEpochCallback = (queryingStatus: QueryingStatus) => void;

type QueryingIterationCallback = (queryingStatus: QueryingStatus) => void;

export {
    DataRepository,
    NetworkAlphaInterface,
    NetworkAlphaConfiguration,
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
};
