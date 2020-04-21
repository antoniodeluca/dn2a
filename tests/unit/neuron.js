import {
    expect
} from 'chai';
import {
    beforeEach,
    describe,
    it
} from 'mocha';

import {Neuron} from '../../assets/index';

describe("Neuron", function () {
    let neuronGenerator = null;
    let neuron = null;

    beforeEach(function() {
        neuronGenerator = Neuron();
        neuron = new neuronGenerator();
    });

    it("Should have a configuration object", function () {
        expect(neuron.configuration).to.be.an('object');
    });
});
