import {
    Brain,
    CerebrumFactory,
    NetworkAlphaFactory,
    NetworkAlphaNeuronFactory,
    NetworkAlphaSynapseFactory,
} from "dn2a";

const brain = new Brain({
    cerebrum: {
        generator: CerebrumFactory.getInstance,
        configuration: {
            minds: [
                {
                    name: "defaultMind",
                    network: {
                        generator: NetworkAlphaFactory.getInstance,
                        configuration: {
                            layerDimensions: [2, 4, 1],
                            learningMode: "stepbystep",
                            learningRate: 0.3,
                            momentumRate: 0.7,
                            maximumError: 0.005,
                            maximumEpoch: 1000,
                            dataRepository: { neuronLayers: [] },
                            neuron: {
                                generator:
                                    NetworkAlphaNeuronFactory.getInstance,
                            },
                            synapse: {
                                generator:
                                    NetworkAlphaSynapseFactory.getInstance,
                            },
                        },
                    },
                    inputsFrom: ["cerebrum"],
                },
            ],
            outputsFrom: ["defaultMind"],
        },
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
brain.cerebrum.trainMind(
    trainingPatterns,
    (trainingStatus: any) => {
        const errorStatus = trainingStatus.outputErrors.reduce(
            (errorStatus: any, outputError: any) => {
                const error = parseFloat(outputError.toString());
                return {
                    minimumError:
                        error < errorStatus.minimumError
                            ? error
                            : errorStatus.minimumError,
                    averageError:
                        errorStatus.averageError +
                        error / trainingStatus.outputErrors.length,
                    maximumError:
                        error > errorStatus.maximumError
                            ? error
                            : errorStatus.maximumError,
                };
            },
            {
                minimumError: 1,
                averageError: 0,
                maximumError: 0,
            }
        );
        /* eslint-disable no-console */
        console.log(
            `Epoch ${trainingStatus.elapsedEpochCounter}\nMin. Err. = ${errorStatus.minimumError}\nAvg. Err. = ${errorStatus.averageError}\nMax. Err. = ${errorStatus.maximumError}\n`
        );
        /* eslint-enable no-console */
    },
    undefined,
    "defaultMind"
);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
];

// Querying
//
// The object passed to the callback function contains information about the querying process.
brain.cerebrum.queryMind(
    queryingPatterns,
    (queryingStatus: any) => {
        queryingStatus.outputPatterns.forEach(
            (outputPattern: any, outputPatternIndex: any) => {
                /* eslint-disable no-console */
                console.log(
                    `Query ${outputPatternIndex}\n[${queryingPatterns[
                        outputPatternIndex
                    ].join(", ")}] = ${outputPattern[0].toString()}\n`
                );
                /* eslint-enable no-console */
            }
        );
    },
    undefined,
    "defaultMind"
);
