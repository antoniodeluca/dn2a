import * as c from 'chai';

import Brain from '../../assets/brain.js';

describe("Brain", function () {
    let brain = null;

    beforeEach(function() {
        brain = new Brain();
    });

    it("Should have a configuration object", function () {
        c.expect(brain.configuration).to.be.an('object');
    });
});
