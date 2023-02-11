import { NetworkFactory as NetworkAlphaFactory } from "@networks/alpha/NetworkFactory";
import { NetworkConfiguration as NetworkAlphaConfiguration } from "@networks/alpha/types";
import {
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "@networks/types";
import { NetworkInterface } from "@networks/types";

import {
    QueryingInputPatterns,
    TrainingPatterns,
} from "./InputOutputInterface";

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

export { CerebrumConfiguration, CerebrumInterface, Mind, MindConfiguration };
