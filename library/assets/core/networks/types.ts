import {
    QueryingInputPatterns,
    QueryingStatus,
    TrainingPatterns,
    TrainingStatus,
} from "@core/types";

interface NetworkInterface {
    train: (
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback
    ) => void;

    query: (
        queryingPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback
    ) => void;
}

type TrainingEpochCallback = (trainingStatus: TrainingStatus) => void;

type TrainingIterationCallback = (trainingStatus: TrainingStatus) => void;

type QueryingEpochCallback = (queryingStatus: QueryingStatus) => void;

type QueryingIterationCallback = (queryingStatus: QueryingStatus) => void;

interface Calculator {
    evaluate: (expression: string, scope: unknown) => number;
}

export {
    Calculator,
    NetworkInterface,
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
};
