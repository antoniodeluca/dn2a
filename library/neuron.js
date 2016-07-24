import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

let Neuron = function(tmpConfiguration) {
    let configuration = tmpConfiguration || {
        numbersPrecision: 32
    };
    m.config({
        number: "BigNumber",
        precision: configuration.numbersPrecision
    });
    return function Neuron() {
        let delta = m.bignumber(0);
        let expectedOutput = m.bignumber(0);
        let fixed = false;
        let incomingConnections = [];
        let inputSum = m.bignumber(0);
        let inputs = [];
        let outgoingConnections = [];
        let output = m.bignumber(0);
        let outputError = m.bignumber(0);
        let previousExpectedOutput = m.bignumber(0);
        let previousIncomingConnections = [];
        let previousInputSum = m.bignumber(0);
        let previousInputs = [];
        let previousOutgoingConnections = [];
        let previousOutput = m.bignumber(0);
        let previousOutputError = m.bignumber(0);
        let proxy = false;
        let transferFunction = function(value) {
            return m.divide(
                m.bignumber(1),
                m.sum(
                    m.bignumber(1),
                    m.exp(
                        m.subtract(
                            m.bignumber(0),
                            value
                        )
                    )
                )
            );
        };
        return {
            addIncomingConnection: function(value) {
                incomingConnections.push(value);
            },
            addOutgoingConnection: function(value) {
                outgoingConnections.push(value);
            },
            addPreviousIncomingConnection: function(value) {
                previousIncomingConnections.push(value);
            },
            addPreviousOutgoingConnection: function(value) {
                previousOutgoingConnections.push(value);
            },
            set delta(value) {
                delta = value;
            },
            get delta() {
                return delta;
            },
            set expectedOutput(value) {
                expectedOutput = value;
            },
            get expectedOutput() {
                return expectedOutput;
            },
            set fixed(value) {
                fixed = value;
            },
            get fixed() {
                return fixed;
            },
            set incomingConnections(value) {
                incomingConnections = value;
            },
            get incomingConnections() {
                return incomingConnections;
            },
            set inputSum(value) {
                inputSum = value;
            },
            get inputSum() {
                return inputSum;
            },
            set inputs(value) {
                inputs = value;
            },
            get inputs() {
                return inputs;
            },
            set outgoingConnections(value) {
                outgoingConnections = value;
            },
            get outgoingConnections() {
                return outgoingConnections;
            },
            set output(value) {
                output = value;
            },
            get output() {
                return output;
            },
            set outputError(value) {
                outputError = value;
            },
            get outputError() {
                return outputError;
            },
            set previousExpectedOutput(value) {
                previousExpectedOutput = value;
            },
            get previousExpectedOutput() {
                return previousExpectedOutput;
            },
            set previousIncomingConnections(value) {
                previousIncomingConnections = value;
            },
            get previousIncomingConnections() {
                return previousIncomingConnections;
            },
            set previousInputSum(value) {
                previousInputSum = value;
            },
            get previousInputSum() {
                return previousInputSum;
            },
            set previousInputs(value) {
                previousInputs = value;
            },
            get previousInputs() {
                return previousInputs;
            },
            set previousOutgoingConnections(value) {
                previousOutgoingConnections = value;
            },
            get previousOutgoingConnections() {
                return previousOutgoingConnections;
            },
            set previousOutput(value) {
                previousOutput = value;
            },
            get previousOutput() {
                return previousOutput;
            },
            set previousOutputError(value) {
                previousOutputError = value;
            },
            get previousOutputError() {
                return previousOutputError;
            },
            set proxy(value) {
                proxy = value;
            },
            get proxy() {
                return proxy;
            },
            set transferFunction(value) {
                transferFunction = value;
            },
            get transferFunction() {
                return transferFunction;
            }
        };
    };
};

export {Neuron};
