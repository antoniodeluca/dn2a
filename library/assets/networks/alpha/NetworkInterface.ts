import {
    QueryingInputPatterns,
    TrainingPatterns,
} from "../../InputOutputInterface";
import {
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "./NetworkAlphaInterface";

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

export { NetworkInterface };
