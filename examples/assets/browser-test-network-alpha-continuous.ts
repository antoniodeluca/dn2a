import {
    DefaultBrain,
    BrainConfiguration,
    CerebrumFactory,
    MathJSCalculator,
    NetworkAlphaFactory,
    NetworkAlphaNeuronFactory,
    NetworkAlphaSynapseFactory,
    TrainingStatus,
    QueryingStatus,
    QueryingOutputPattern,
} from "dn2a";

const run = () => {
    const mathJSCalculator = new MathJSCalculator();
    const cerebrumFactory = new CerebrumFactory(mathJSCalculator);
    const networkAlphaFactory = new NetworkAlphaFactory(mathJSCalculator);
    const networkAlphaNeuronFactory = new NetworkAlphaNeuronFactory(
        mathJSCalculator
    );
    const networkAlphaSynapseFactory = new NetworkAlphaSynapseFactory(
        mathJSCalculator
    );
    const brain = DefaultBrain.getInstance({
        cerebrum: {
            generator: cerebrumFactory,
            configuration: {
                minds: [
                    {
                        name: "defaultMind",
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
                outputsFrom: ["defaultMind"],
            },
        },
    } as BrainConfiguration);

    // Training
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

    interface ErrorStatus {
        minimumError: number;
        averageError: number;
        maximumError: number;
    }
    brain.cerebrum.trainMind(
        trainingPatterns,
        (trainingStatus: TrainingStatus) => {
            const errorStatus = trainingStatus.outputErrors.reduce(
                (errorStatus: ErrorStatus, outputError: number) => {
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
        }
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
        (queryingStatus: QueryingStatus) => {
            queryingStatus.outputPatterns.forEach(
                (
                    outputPattern: QueryingOutputPattern,
                    outputPatternIndex: number
                ) => {
                    /* eslint-disable no-console */
                    console.log(
                        `Query ${outputPatternIndex} \n[${queryingPatterns[
                            outputPatternIndex
                        ].join(", ")}] = ${outputPattern[0].toString()}\n`
                    );
                    /* eslint-enable no-console */
                }
            );
        }
    );
};

document.addEventListener("DOMContentLoaded", run);
