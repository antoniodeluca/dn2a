import {
    expect
} from 'chai';
import {
    beforeEach,
    describe,
    it
} from 'mocha';

import {Cerebrum} from '../../assets/index';

describe("Cerebrum", function () {
    let cerebrum = null;

    beforeEach(function() {
        cerebrum = new Cerebrum();
    });

    it("Should have a configuration object", function () {
        expect(cerebrum.configuration).to.be.an('object');
    });
});
