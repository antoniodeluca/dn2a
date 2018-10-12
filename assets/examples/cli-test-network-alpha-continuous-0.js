// Importation
var DN2A = require("../dn2a");

// Instantiation
var neuralNetwork = new DN2A.NetworkAlpha();

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
