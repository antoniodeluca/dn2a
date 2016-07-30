require("jasmine-expect");

var Neuron = require("../built/neuron.js").Neuron;

describe("Neuron", function () {
    var neuronGenerator = null;
    var neuron = null;

    beforeEach(function() {
        neuronGenerator = Neuron();
        neuron = new neuronGenerator();
    });

    it("should have a configuration object", function () {
        expect(neuron.configuration).toBeObject();
    });
});
