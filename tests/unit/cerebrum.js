import * as c from 'chai';

import Cerebrum from '../../assets/cerebrum.js';

describe("Cerebrum", function () {
    let cerebrum = null;

    beforeEach(function() {
        cerebrum = new Cerebrum();
    });

    it("Should have a configuration object", function () {
        c.expect(cerebrum.configuration).to.be.an('object');
    });
});
