import * as c from 'chai';

import Synapse from '../../assets/synapse.js';

describe("Synapse", function () {
    let synapseGenerator = null;
    let synapse = null;

    beforeEach(function() {
        synapseGenerator = Synapse();
        synapse = new synapseGenerator();
    });

    it("Should have a configuration object", function () {
        c.expect(synapse.configuration).to.be.an('object');
    });
});
