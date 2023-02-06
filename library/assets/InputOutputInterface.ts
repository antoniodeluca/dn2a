interface TrainingPattern {
    input: number[];
    output: number[];
}

type TrainingPatterns = TrainingPattern[];

interface TrainingStatus {
    outputErrors: number[];
    interruptionRequest: boolean;
    elapsedEpochCounter: number;
    elapsedIterationCounter: number;
    elapsedIterationPattern: {
        input: number[];
        target: number[];
        output: number[];
        error: number;
    };
}

type QueryingPattern = number[];

type QueryingPatterns = QueryingPattern[];

interface QueryingStatus {
    outputPatterns: number[][];
    elapsedIterationCounter: number;
    elapsedIterationPattern: {
        input: number[];
        output: number[];
    };
}

export {
    TrainingPattern,
    TrainingPatterns,
    TrainingStatus,
    QueryingPattern,
    QueryingPatterns,
    QueryingStatus,
};
