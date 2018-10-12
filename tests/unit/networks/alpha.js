import * as c from 'chai';

import NetworkAlpha from '../../../assets/networks/alpha.js';

describe("NetworkAlpha", function () {
    let networkAlpha = null;

    beforeEach(function() {
        networkAlpha = new NetworkAlpha();
    });

    it("Should have a configuration object", function () {
        c.expect(networkAlpha.configuration).to.be.an('object');
    });
});
