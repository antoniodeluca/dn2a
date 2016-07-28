// Importation
var DN2A = require("../built/dn2a");

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
var inputPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
neuralNetwork.query(inputPatterns, function(queryingStatus) {
    inputPatterns.forEach(function(inputPatten, inputPatternIndex) {
        console.log("[" + inputPatterns[inputPatternIndex].join(", ") + "] => [" + queryingStatus.outputPatterns[inputPatternIndex].join(", ") + "]");
    });
});
