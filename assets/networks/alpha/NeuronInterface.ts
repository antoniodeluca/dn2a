import { SynapseInterface } from "./SynapseInterface";

interface NeuronInterface {
    delta: number;

    expectedOutput: number;

    fixed: boolean;

    incomingConnections: SynapseInterface[];

    inputSum: number;

    inputs: number[];

    outgoingConnections: SynapseInterface[];

    output: number;

    outputError: number;

    previousExpectedOutput: number;

    previousIncomingConnections: SynapseInterface[];

    previousInputSum: number;

    previousInputs: number[];

    previousOutgoingConnections: SynapseInterface[];

    previousOutput: number;

    previousOutputError: number;

    proxy: boolean;

    transferFunction: (value: number) => number;

    addIncomingConnection: (value: SynapseInterface) => void;

    addOutgoingConnection: (value: SynapseInterface) => void;

    addPreviousIncomingConnection: (value: SynapseInterface) => void;

    addPreviousOutgoingConnection: (value: SynapseInterface) => void;
}

interface NeuronConfiguration {}

export {
    NeuronConfiguration,
    NeuronInterface
}