import { QueryingStatus, TrainingStatus } from "../../InputOutputInterface";
import { NetworkInterface } from "./NetworkInterface";
import { NeuronConfiguration, NeuronInterface } from "./NeuronInterface";
import { SynapseConfiguration, SynapseInterface } from "./SynapseInterface";

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
        generator: (configuration?: NeuronConfiguration) => NeuronInterface;
        configuration?: NeuronConfiguration;
    };
    synapse: {
        generator: (configuration?: SynapseConfiguration) => SynapseInterface;
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
