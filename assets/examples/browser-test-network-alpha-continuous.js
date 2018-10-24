var run = function(DN2A) {
    var brain = new DN2A.Brain({
        cerebrum: {
            generator: DN2A.Cerebrum,
            configuration: {
                minds: [
                    {
                        name: "defaultMind",
                        network: {
                            generator: DN2A.NetworkAlpha,
                            configuration: {
                                layerDimensions: [2, 4, 1],
                                learningMode: "continuous",
                                learningRate: 0.3,
                                momentumRate: 0.7,
                                maximumError: 0.005,
                                maximumEpoch: 1000,
                                dataRepository: {},
                                neuron: {
                                    generator: DN2A.Neuron
                                },
                                synapse: {
                                    generator: DN2A.Synapse
                                },
                                numbersPrecision: 32
                            }
                        },
                        inputsFrom: [
                            "cerebrum"
                        ]
                    }
                ],
                outputsFrom: [
                    "defaultMind"
                ]
            }
        }
    });

    brain.cerebrum.trainMind([
        {
            input: [0, 0],
            output: [0]
        },
        {
            input: [0, 1],
            output: [1]
        },
        {
            input: [1, 0],
            output: [1]
        },
        {
            input: [1, 1],
            output: [0]
        }
    ], function(trainingStatus) {
        const errorStatus = trainingStatus.outputErrors.reduce(
            function(errorStatus, outputError) {
                const error = parseFloat(outputError.toString());
                return {
                    minimumError: error < errorStatus.minimumError ? error : errorStatus.minimumError,
                    averageError: errorStatus.averageError + (error / trainingStatus.outputErrors.length),
                    maximumError: error > errorStatus.maximumError ? error : errorStatus.maximumError
                }
            },
            {
                minimumError: 1,
                averageError: 0,
                maximumError: 0
            }
        );
        /* eslint-disable no-console */
        console.log(
            "Epoch " +
            trainingStatus.elapsedEpochCounter +
            "\n" +
            "Min. Err. = " +
            errorStatus.minimumError +
            "\n" +
            "Avg. Err. = " +
            errorStatus.averageError +
            "\n" +
            "Max. Err. = " +
            errorStatus.maximumError +
            "\n"
        );
        /* eslint-enable no-console */
    });

    var queryingPatterns = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];
    brain.cerebrum.queryMind(
        queryingPatterns,
        function(queryingStatus) {
            queryingStatus.outputPatterns.forEach(
                function(
                    outputPattern,
                    outputPatternIndex
                ) {
                    /* eslint-disable no-console */
                    console.log(
                        "Query " +
                        outputPatternIndex +
                        "\n" +
                        "[" + queryingPatterns[outputPatternIndex].join(", ") + "] = " +
                        outputPattern[0].toString() +
                        "\n"
                    );
                    /* eslint-enable no-console */
                }
            );
        }
    );
};

document.addEventListener('DOMContentLoaded', function() {
    run(window.DN2A);
});
