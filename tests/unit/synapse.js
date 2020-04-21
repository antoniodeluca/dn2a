import {
    expect
} from 'chai';
import {
    beforeEach,
    describe,
    it
} from 'mocha';

import {Synapse} from '../../assets/index';

describe("Synapse", function () {
    let synapseGenerator = null;
    let synapse = null;

    beforeEach(function() {
        synapseGenerator = Synapse();
        synapse = new synapseGenerator();
    });

    it("Should have a configuration object", function () {
        expect(synapse.configuration).to.be.an('object');
    });
});
