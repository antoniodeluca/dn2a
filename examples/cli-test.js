var _ = require("lodash");

var DN2A = require("../built/dn2a").DN2A;
var dn2a = new DN2A();

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
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    },
    {
        input: [1, 1],
        output: [0]
    }
], function(outputPattern) {
    _.forEach(outputPattern, function(value) {
        console.log(value.toString());
    });
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
