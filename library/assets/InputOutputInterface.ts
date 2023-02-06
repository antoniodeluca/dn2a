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

export {
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
