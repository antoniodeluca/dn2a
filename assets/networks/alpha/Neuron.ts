import {all, BigNumber, create} from "mathjs";
 
import { NeuronConfiguration, NeuronInterface } from "./NeuronInterface";
import { SynapseInterface } from "./SynapseInterface";

const mathjs = create(all);

class Neuron implements NeuronInterface {
    private defaultConfiguration = {
        numbersPrecision: 64
    } as NeuronConfiguration;

    private configuration: NeuronConfiguration;

    private _delta = mathjs.bignumber(0);

    private _expectedOutput = mathjs.bignumber(0);

    private _fixed = false;

    private _incomingConnections = [] as SynapseInterface[];

    private _inputSum = mathjs.bignumber(0);

    private _inputs: number[] = [];

    private _outgoingConnections = [] as SynapseInterface[];

    private _output = mathjs.bignumber(0);

    private _outputError = mathjs.bignumber(0);

    private _previousExpectedOutput = mathjs.bignumber(0);

    private _previousIncomingConnections = [] as SynapseInterface[];

    private _previousInputSum = mathjs.bignumber(0);

    private _previousInputs: number[] = [];

    private _previousOutgoingConnections = [] as SynapseInterface[];

    private _previousOutput = mathjs.bignumber(0);

    private _previousOutputError = mathjs.bignumber(0);

    private _proxy = false;

    private _transferFunction = (value: BigNumber) => {
        return mathjs.bignumber(mathjs.divide(
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
        ).toString());
    };

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }

    constructor(configuration?: NeuronConfiguration) {
        this.configuration = configuration ? configuration : this.defaultConfiguration

        if (!this.checkConfiguration()) {
            throw "Invalid Neuron Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        mathjs.config({
            number: "BigNumber",
        });
    };

    addIncomingConnection(value: SynapseInterface) {
        this._incomingConnections.push(value);
    }

    addOutgoingConnection(value: SynapseInterface) {
        this._outgoingConnections.push(value);
    }

    addPreviousIncomingConnection(value: SynapseInterface) {
        this._previousIncomingConnections.push(value);
    }

    addPreviousOutgoingConnection(value: SynapseInterface) {
        this._previousOutgoingConnections.push(value);
    }

    set delta(value) {
        this._delta = value;
    }

    get delta() {
        return this._delta;
    }

    set expectedOutput(value) {
        this._expectedOutput = value;
    }

    get expectedOutput() {
        return this._expectedOutput;
    }

    set fixed(value) {
        this._fixed = value;
    }

    get fixed() {
        return this._fixed;
    }

    set incomingConnections(value) {
        this._incomingConnections = value;
    }

    get incomingConnections() {
        return this._incomingConnections;
    }

    set inputSum(value) {
        this._inputSum = value;
    }

    get inputSum() {
        return this._inputSum;
    }

    set inputs(value) {
        this._inputs = value;
    }

    get inputs() {
        return this._inputs;
    }

    set outgoingConnections(value) {
        this._outgoingConnections = value;
    }

    get outgoingConnections() {
        return this._outgoingConnections;
    }

    set output(value) {
        this._output = value;
    }

    get output() {
        return this._output;
    }

    set outputError(value) {
        this._outputError = value;
    }

    get outputError() {
        return this._outputError;
    }

    set previousExpectedOutput(value) {
        this._previousExpectedOutput = value;
    }

    get previousExpectedOutput() {
        return this._previousExpectedOutput;
    }

    set previousIncomingConnections(value) {
        this._previousIncomingConnections = value;
    }

    get previousIncomingConnections() {
        return this._previousIncomingConnections;
    }

    set previousInputSum(value) {
        this._previousInputSum = value;
    }

    get previousInputSum() {
        return this._previousInputSum;
    }

    set previousInputs(value) {
        this._previousInputs = value;
    }

    get previousInputs() {
        return this._previousInputs;
    }

    set previousOutgoingConnections(value) {
        this._previousOutgoingConnections = value;
    }

    get previousOutgoingConnections() {
        return this._previousOutgoingConnections;
    }

    set previousOutput(value) {
        this._previousOutput = value;
    }

    get previousOutput() {
        return this._previousOutput;
    }

    set previousOutputError(value) {
        this._previousOutputError = value;
    }

    get previousOutputError() {
        return this._previousOutputError;
    }

    set proxy(value) {
        this._proxy = value;
    }

    get proxy() {
        return this._proxy;
    }

    set transferFunction(value) {
        this._transferFunction = value;
    }

    get transferFunction() {
        return this._transferFunction;
    }
}

export { 
    Neuron
}
