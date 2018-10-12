import * as c from 'chai';

import Neuron from '../../assets/neuron.js';

describe("Neuron", function () {
    let neuronGenerator = null;
    let neuron = null;

    beforeEach(function() {
        neuronGenerator = Neuron();
        neuron = new neuronGenerator();
    });

    it("Should have a configuration object", function () {
        c.expect(neuron.configuration).to.be.an('object');
    });
});
