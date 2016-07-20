var _ = require("lodash");

var DN2A = require("../built/dn2a").DN2A;
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
], function(result) {
    console.log(result.outputError.toString());
});
