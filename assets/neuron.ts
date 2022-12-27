import {create, all} from "mathjs";

const mathjs = create(all);

const Neuron = function(precisionConfiguration?) {
    precisionConfiguration = precisionConfiguration || {
        numbersPrecision: 64
    };
    const Neuron = function(configuration?) {
        this.configuration = configuration || {
            numbersPrecision: precisionConfiguration.numbersPrecision
        };

        if (!this.checkConfiguration()) {
            throw "Invalid Neuron Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        mathjs.config({
            number: "BigNumber",
            // precision: this.configuration.numbersPrecision
        });

        this._delta = mathjs.bignumber(0);

        this._expectedOutput = mathjs.bignumber(0);

        this._fixed = false;

        this._incomingConnections = [];

        this._inputSum = mathjs.bignumber(0);

        this._inputs = [];

        this._outgoingConnections = [];

        this._output = mathjs.bignumber(0);

        this._outputError = mathjs.bignumber(0);

        this._previousExpectedOutput = mathjs.bignumber(0);

        this._previousIncomingConnections = [];

        this._previousInputSum = mathjs.bignumber(0);

        this._previousInputs = [];

        this._previousOutgoingConnections = [];

        this._previousOutput = mathjs.bignumber(0);

        this._previousOutputError = mathjs.bignumber(0);

        this._proxy = false;

        this._transferFunction = function(value) {
            return mathjs.divide(
                mathjs.bignumber(1),
                mathjs.sum(
                    mathjs.bignumber(1),
                    mathjs.exp(
                        mathjs.subtract(
                            mathjs.bignumber(0),
                            value
                        )
                    )
                )
            );
        };
    };

    Neuron.prototype = {
        checkConfiguration: function() {
            return true;
        },
        transformConfiguration: function() {
            return this.configuration;
        },
        addIncomingConnection: function(value) {
            this._incomingConnections.push(value);
        },
        addOutgoingConnection: function(value) {
            this._outgoingConnections.push(value);
        },
        addPreviousIncomingConnection: function(value) {
            this._previousIncomingConnections.push(value);
        },
        addPreviousOutgoingConnection: function(value) {
            this._previousOutgoingConnections.push(value);
        },
        set delta(value) {
            this._delta = value;
        },
        get delta() {
            return this._delta;
        },
        set expectedOutput(value) {
            this._expectedOutput = value;
        },
        get expectedOutput() {
            return this._expectedOutput;
        },
        set fixed(value) {
            this._fixed = value;
        },
        get fixed() {
            return this._fixed;
        },
        set incomingConnections(value) {
            this._incomingConnections = value;
        },
        get incomingConnections() {
            return this._incomingConnections;
        },
        set inputSum(value) {
            this._inputSum = value;
        },
        get inputSum() {
            return this._inputSum;
        },
        set inputs(value) {
            this._inputs = value;
        },
        get inputs() {
            return this._inputs;
        },
        set outgoingConnections(value) {
            this._outgoingConnections = value;
        },
        get outgoingConnections() {
            return this._outgoingConnections;
        },
        set output(value) {
            this._output = value;
        },
        get output() {
            return this._output;
        },
        set outputError(value) {
            this._outputError = value;
        },
        get outputError() {
            return this._outputError;
        },
        set previousExpectedOutput(value) {
            this._previousExpectedOutput = value;
        },
        get previousExpectedOutput() {
            return this._previousExpectedOutput;
        },
        set previousIncomingConnections(value) {
            this._previousIncomingConnections = value;
        },
        get previousIncomingConnections() {
            return this._previousIncomingConnections;
        },
        set previousInputSum(value) {
            this._previousInputSum = value;
        },
        get previousInputSum() {
            return this._previousInputSum;
        },
        set previousInputs(value) {
            this._previousInputs = value;
        },
        get previousInputs() {
            return this._previousInputs;
        },
        set previousOutgoingConnections(value) {
            this._previousOutgoingConnections = value;
        },
        get previousOutgoingConnections() {
            return this._previousOutgoingConnections;
        },
        set previousOutput(value) {
            this._previousOutput = value;
        },
        get previousOutput() {
            return this._previousOutput;
        },
        set previousOutputError(value) {
            this._previousOutputError = value;
        },
        get previousOutputError() {
            return this._previousOutputError;
        },
        set proxy(value) {
            this._proxy = value;
        },
        get proxy() {
            return this._proxy;
        },
        set transferFunction(value) {
            this._transferFunction = value;
        },
        get transferFunction() {
            return this._transferFunction;
        }
    };
    return Neuron;
};

export { 
    Neuron
};
