import {
    NetworkAlpha,
    NetworkAlphaNeuronFactory,
    NetworkAlphaSynapseFactory,
} from "dn2a";

const neuralNetwork = new NetworkAlpha({
    layerDimensions: [2, 4, 4, 1],
    learningMode: "continuous",
    learningRate: 0.3,
    momentumRate: 0.7,
    maximumError: 0.005,
    maximumEpoch: 20000,
    dataRepository: { neuronLayers: [] },
    neuron: {
        generator: NetworkAlphaNeuronFactory.getInstance,
    },
    synapse: {
        generator: NetworkAlphaSynapseFactory.getInstance,
    },
});

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
//
// The object passed to the callback function contains information about the training process.
neuralNetwork.train(
    trainingPatterns,
    (trainingStatus: any) => {
        /* eslint-disable-next-line no-console */
        console.log("Epoch: " + trainingStatus.elapsedEpochCounter);
    },
    undefined
);

/* eslint-disable no-console */
console.log("");

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
    (queryingStatus: any) => {
        queryingPatterns.forEach(
            (queryingPattern: any, queryingPatternIndex: any) => {
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
