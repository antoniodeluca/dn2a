import { all, create, EvalFunction, MathExpression } from "mathjs";
 
import { NeuronConfiguration, NeuronInterface } from "./NeuronInterface";
import { SynapseInterface } from "./SynapseInterface";

const mathjs = create(all);
mathjs.config({
    number: "number",
});

class Neuron implements NeuronInterface {
    private defaultConfiguration = {} as NeuronConfiguration;

    private configuration: NeuronConfiguration;

    private compiledExpressions: { [key: string]: EvalFunction } = {};

    private _delta = 0;

    private _expectedOutput = 0;

    private _fixed = false;

    private _incomingConnections = [] as SynapseInterface[];

    private _inputSum = 0;

    private _inputs: number[] = [];

    private _outgoingConnections = [] as SynapseInterface[];

    private _output = 0;

    private _outputError = 0;

    private _previousExpectedOutput = 0;

    private _previousIncomingConnections = [] as SynapseInterface[];

    private _previousInputSum = 0;

    private _previousInputs: number[] = [];

    private _previousOutgoingConnections = [] as SynapseInterface[];

    private _previousOutput = 0;

    private _previousOutputError = 0;

    private _proxy = false;

    private _transferFunction = (value: number) => {
        return this.evaluate(
            "1 / (1 + e^-value)",
            { value }
        );
    };

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }

    private evaluate(expression: MathExpression, scope: unknown) {
        const compiledExpressionIndex = expression.toString();
        if (!this.compiledExpressions[compiledExpressionIndex]) {
            this.compiledExpressions[compiledExpressionIndex] = mathjs.compile(expression);
        }

        return this.compiledExpressions[compiledExpressionIndex].evaluate(scope);
    }

    constructor(configuration?: NeuronConfiguration) {
        this.configuration = configuration ? configuration : this.defaultConfiguration

        if (!this.checkConfiguration()) {
            throw "Invalid Neuron Module Configuration";
        }
        this.configuration = this.transformConfiguration();
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
