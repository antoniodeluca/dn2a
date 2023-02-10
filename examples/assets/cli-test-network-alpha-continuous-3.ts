import {
    DefaultCerebrum,
    CerebrumConfiguration,
    NetworkAlphaFactory,
    NetworkAlphaNeuronFactory,
    NetworkAlphaSynapseFactory,
    MathJSCalculator,
    TrainingStatus,
    QueryingStatus,
    QueryingInputPattern,
} from "dn2a";

const mathJSCalculator = new MathJSCalculator();
const networkAlphaFactory = new NetworkAlphaFactory(mathJSCalculator);
const networkAlphaNeuronFactory = new NetworkAlphaNeuronFactory(
    mathJSCalculator
);
const networkAlphaSynapseFactory = new NetworkAlphaSynapseFactory(
    mathJSCalculator
);
const cerebrum = DefaultCerebrum.getInstance({
    minds: [
        {
            name: "firstNeuralNetwork",
            network: {
                generator: networkAlphaFactory,
                configuration: {
                    layerDimensions: [2, 4, 1],
                    learningMode: "continuous",
                    learningRate: 0.3,
                    momentumRate: 0.7,
                    maximumError: 0.005,
                    maximumEpoch: 1000,
                    dataRepository: { neuronLayers: [] },
                    neuron: {
                        generator: networkAlphaNeuronFactory,
                    },
                    synapse: {
                        generator: networkAlphaSynapseFactory,
                    },
                },
            },
            inputsFrom: ["cerebrum"],
        },
    ],
    outputsFrom: ["firstNeuralNetwork"],
} as CerebrumConfiguration);

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
// The name passed to the trainMind method specifies which specific mind to train
cerebrum.trainMind(
    trainingPatterns,
    (trainingStatus: TrainingStatus) => {
        /* eslint-disable-next-line no-console */
        console.log(`Epoch: ${trainingStatus.elapsedEpochCounter}`);
    },
    undefined,
    "firstNeuralNetwork"
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
// The name passed to the queryMind method specifies which specific mind to query
cerebrum.queryMind(
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
    undefined,
    "firstNeuralNetwork"
);
