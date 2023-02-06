import { QueryingPatterns, TrainingPatterns } from "../../InputOutputInterface";
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
        queryingPatterns: QueryingPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback
    ) => void;
}

export { NetworkInterface };
