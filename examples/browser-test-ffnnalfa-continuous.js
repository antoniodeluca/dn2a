var dn2a = new DN2A({
    brain: {

    },
    cerebrum: {
        minds: [
            {
                name: "defaultMind", // a mind can be named only with chars and numbers without spaces and special symbols ("cerebrum" is a reserverd word)
                type: "ffnnalfa",
                inputsFrom: [
                    "cerebrum"
                ], // a mind can get inputs from cerebrum and/or one or more minds
                parameters: {
                    layerDimensions: [2, 4, 1],
                    learningMode: "continuous", // could be stepbystep
                    learningRate: 0.3,
                    momentumRate: 0.7,
                    maximumError: 0.005
                }
            }
        ]
    }
});

dn2a.cerebrum.trainMind([
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
dn2a.cerebrum.queryMind(
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
