import {
    DefaultNetworkAlpha,
    QueryingInputPattern,
    QueryingStatus,
} from "dn2a";

const neuralNetwork = DefaultNetworkAlpha.getInstance();

const trainingPatterns = [
    {
        input: [0, 0],
        output: [0],
    },
    {
        input: [0, 1],
        output: [1],
    },
    {
        input: [1, 0],
        output: [1],
    },
    {
        input: [1, 1],
        output: [0],
    },
];

// Training
neuralNetwork.train(trainingPatterns);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
];

// Querying
//
// The object passed to the callback function contains information about the querying process.
neuralNetwork.query(
    queryingPatterns,
    (queryingStatus: QueryingStatus) => {
        queryingPatterns.forEach(
            (
                queryingPattern: QueryingInputPattern,
                queryingPatternIndex: number
            ) => {
                /* eslint-disable no-console */
                console.log(
                    `[${queryingPatterns[queryingPatternIndex].join(
                        ", "
                    )}] => [${queryingStatus.outputPatterns[
                        queryingPatternIndex
                    ].join(", ")}]`
                );
                /* eslint-enable no-console */
            }
        );
    },
    undefined
);
