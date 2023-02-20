import { NetworkFactory as NetworkAlphaFactory } from "@networks/alpha/NetworkFactory";
import { NetworkConfiguration as NetworkAlphaConfiguration } from "@networks/alpha/types";
import {
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "@networks/types";
import { NetworkInterface } from "@networks/types";

import { CerebrumFactory } from "./CerebrumFactory";

interface TrainingPattern {
    input: number[];
    output: number[];
}

type TrainingPatterns = TrainingPattern[];

interface TrainingIterationPattern {
    input: number[];
    target: number[];
    output: number[];
    error: number;
}

interface TrainingStatus {
    outputErrors: number[];
    interruptionRequest: boolean;
    elapsedEpochCounter: number;
    elapsedIterationCounter: number;
    elapsedIterationPattern: TrainingIterationPattern;
}

type QueryingInputPattern = number[];

type QueryingInputPatterns = QueryingInputPattern[];

type QueryingOutputPattern = number[];

type QueryingOutputPatterns = QueryingOutputPattern[];

interface QueryingIterationPattern {
    input: number[];
    output: number[];
}

interface QueryingStatus {
    outputPatterns: number[][];
    elapsedIterationCounter: number;
    elapsedIterationPattern: QueryingIterationPattern;
}

interface CerebrumInterface {
    buildNetwork: (configuration: NetworkConfiguration) => void;

    trainNetwork: (
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback,
        networkName?: string
    ) => void;

    queryNetwork: (
        queryingPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback,
        networkName?: string
    ) => void;
}

interface NetworkConfiguration {
    name: string;
    code: {
        generator: NetworkAlphaFactory;
        configuration?: NetworkAlphaConfiguration;
    };
    inputsFrom: string[];
}

interface CerebrumConfiguration {
    networks: NetworkConfiguration[];
    outputsFrom: string[];
}

interface Network {
    name: string;
    code: NetworkInterface;
}

interface BrainInterface {
    cerebrum: CerebrumInterface;
}

interface BrainConfiguration {
    cerebrum: {
        generator: CerebrumFactory;
        configuration?: CerebrumConfiguration;
    };
}

export {
    CerebrumConfiguration,
    CerebrumInterface,
    Network,
    NetworkConfiguration,
    BrainConfiguration,
    BrainInterface,
    TrainingPattern,
    TrainingPatterns,
    TrainingIterationPattern,
    TrainingStatus,
    QueryingInputPattern,
    QueryingInputPatterns,
    QueryingOutputPattern,
    QueryingOutputPatterns,
    QueryingIterationPattern,
    QueryingStatus,
};
