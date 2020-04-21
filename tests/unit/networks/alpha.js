import {
    expect
} from 'chai';
import {
    number
} from "mathjs";
import {
    beforeEach,
    describe,
    it
} from 'mocha';

import {NetworkAlpha} from '../../../assets/index';

describe('NetworkAlpha', function () {
    let networkAlpha = null;

    beforeEach(function() {
        networkAlpha = new NetworkAlpha();
    });

    it('Should have a configuration object', function() {
        expect(networkAlpha.configuration).to.be.an('object');
    });

    it('Should have a generateNeuron method', function() {
        expect(networkAlpha.generateNeuron).to.be.a('function');
    });

    describe('generateNeuron()', function () {
        it('Should be able to return a correctly parameterized input neuron', function() {
            const neuron = networkAlpha.generateNeuron('input');
            expect(neuron).to.be.an('object');
            expect(neuron).to.have.property('fixed');
            expect(neuron.fixed).to.equal(false);
            expect(neuron).to.have.property('output');
            expect(number(neuron.output)).to.equal(0);
            expect(neuron).to.have.property('proxy');
            expect(neuron.proxy).to.equal(true);
        });

        it('Should be able to return a correctly parameterized bias neuron', function() {
            const neuron = networkAlpha.generateNeuron('bias');
            expect(neuron).to.be.an('object');
            expect(neuron).to.have.property('fixed');
            expect(neuron.fixed).to.equal(true);
            expect(neuron).to.have.property('output');
            expect(number(neuron.output)).to.equal(1);
            expect(neuron).to.have.property('proxy');
            expect(neuron.proxy).to.equal(false);
        });

        it('Should be able to return a correctly parameterized hidden neuron', function() {
            const neuron = networkAlpha.generateNeuron('hidden');
            expect(neuron).to.be.an('object');
            expect(neuron).to.have.property('fixed');
            expect(neuron.fixed).to.equal(false);
            expect(neuron).to.have.property('output');
            expect(number(neuron.output)).to.equal(0);
            expect(neuron).to.have.property('proxy');
            expect(neuron.proxy).to.equal(false);
        });
    });
});
