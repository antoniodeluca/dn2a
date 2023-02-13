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
    buildMind: (configuration: MindConfiguration) => void;

    trainMind: (
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback,
        mindName?: string
    ) => void;

    queryMind: (
        queryingPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback,
        mindName?: string
    ) => void;
}

interface MindConfiguration {
    name: string;
    network: {
        generator: NetworkAlphaFactory;
        configuration?: NetworkAlphaConfiguration;
    };
    inputsFrom: string[];
}

interface CerebrumConfiguration {
    minds: MindConfiguration[];
    outputsFrom: string[];
}

interface Mind {
    name: string;
    network: NetworkInterface;
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
    Mind,
    MindConfiguration,
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
