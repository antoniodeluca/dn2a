// Importation
var DN2A = require("../index");

// Instantiation
var cerebrum = new DN2A.Cerebrum({
    minds: [
        {
            name: "firstNeuralNetwork",
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
        "firstNeuralNetwork"
    ]
});

// Training
//
// The name passed to the trainMind method specifies which specific mind to train
var trainingPatterns = [
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
cerebrum.trainMind(
    trainingPatterns,
    function(trainingStatus) {
        /* eslint-disable-next-line no-console */
        console.log("Epoch: " + trainingStatus.elapsedEpochCounter);
    },
    null,
    "firstNeuralNetwork"
);

// Querying
//
// The name passed to the queryMind method specifies which specific mind to query
var queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
cerebrum.queryMind(
    queryingPatterns,
    function(queryingStatus) {
        queryingPatterns.forEach(function(queryingPattern, queryingPatternIndex) {
            /* eslint-disable no-console */
            console.log(
                "[" +
                queryingPatterns[queryingPatternIndex].join(", ") +
                "] => [" +
                queryingStatus.outputPatterns[queryingPatternIndex].join(", ") +
                "]"
            );
            /* eslint-enable no-console */
        });
    },
    null,
    "firstNeuralNetwork"
);
