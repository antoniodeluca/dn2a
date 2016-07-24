var _ = require("lodash");

var DN2A = require("../built/dn2a");
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
                            learningMode: "stepbystep",
                            learningRate: 0.3,
                            momentumRate: 0.7,
                            maximumError: 0.005,
                            maximumEpoch: 1000,
                            dataRepository: {},
                            neuronGenerator: DN2A.Neuron,
                            synapseGenerator: DN2A.Synapse,
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
    let errorStatus = _.reduce(
        trainingStatus.outputErrors,
        function(errorStatus, outputError) {
            let error = parseFloat(outputError.toString());
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
});

var queryingPatterns = [
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
];
brain.cerebrum.queryMind(
    queryingPatterns,
    function(queryingStatus) {
        _.forEach(
            queryingStatus.outputPatterns,
            function(
                outputPattern,
                outputPatternIndex,
                outputPatterns
            ) {
                console.log(
                    "Query " +
                    outputPatternIndex +
                    "\n" +
                    "[" + queryingPatterns[outputPatternIndex].input.join(", ") + "] = " +
                    outputPattern[0].toString() +
                    "\n"
                );
            }
        );
    }
);
