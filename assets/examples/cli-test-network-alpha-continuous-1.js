// Importation
var DN2A = require("../dn2a");

// Instantiation
//
// The object passed to the constructor function contains properties describing the neural network.
// The list of the properties is reported in the main README file.
// In case one or more properties are not present they are substituted with defaults.
// Same thing happens if the object is not passed at all.
var neuralNetwork = new DN2A.NetworkAlpha({
    layerDimensions: [2, 4, 4, 1], // the default would be [2, 4, 1]
    learningMode: "continuous",
    learningRate: 0.3,
    momentumRate: 0.7,
    maximumError: 0.005,
    maximumEpoch: 20000, // the default would be 1000
    dataRepository: {},
    neuron: {
        generator: DN2A.Neuron
    },
    synapse: {
        generator: DN2A.Synapse
    },
    numbersPrecision: 32
});

// Training
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
neuralNetwork.train(trainingPatterns);

// Querying
//
// The object passed to the callback function contains information about the querying process.
var queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
neuralNetwork.query(
    queryingPatterns,
    function(queryingStatus) {
        queryingPatterns.forEach(function(queryingPattern, queryingPatternIndex) {
            console.log("[" + queryingPatterns[queryingPatternIndex].join(", ") + "] => [" + queryingStatus.outputPatterns[queryingPatternIndex].join(", ") + "]");
        });
    }
);
