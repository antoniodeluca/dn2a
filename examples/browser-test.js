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
                    layerDimensions: [2, 3, 3, 1],
                    learningMode: "stepbystep", // could be continuous
                    learningRate: 0.5,
                    maximumError: 0.005
                }
            }
        ]
    }
});

/*
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
    }
], function() {

});
*/
dn2a.cerebrum.trainMind([
    {
        input: [1, 1],
        output: [0]
    }
], function() {
    // console.log(outputPattern);
});

/*
var inputs;
var outputs;
inputs = [
    {
        pattern: [0, 0]
    }
];
outputs = dn2a.cerebrum.queryMind(inputs, function() {});
// console.log("input " + inputs[0].pattern + " gives " + outputs[0].pattern);
inputs = [
    {
        pattern: [0, 1]
    },
    {
        pattern: [1, 0]
    },
    {
        pattern: [1, 1]
    }
];
outputs = dn2a.cerebrum.queryMind(inputs, function() {});
for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
    // console.log("input " + inputs[inputIndex].pattern + " gives " + outputs[inputIndex].pattern);
}
*/
