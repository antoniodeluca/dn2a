var Synapse = require("../built/synapse.js").Synapse;

describe("Synapse", function () {
    var synapseGenerator = null;
    var synapse = null;

    beforeEach(function() {
        synapseGenerator = Synapse();
        synapse = new synapseGenerator();
    });

    it("should have a configuration object", function () {
        expect(synapse.configuration).toBeObject();
    });
});
