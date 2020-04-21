import {
    expect
} from 'chai';
import {
    beforeEach,
    describe,
    it
} from 'mocha';

import {Brain} from '../../assets/index';

describe("Brain", function () {
    let brain = null;

    beforeEach(function() {
        brain = new Brain();
    });

    it("Should have a configuration object", function () {
        expect(brain.configuration).to.be.an('object');
    });
});
