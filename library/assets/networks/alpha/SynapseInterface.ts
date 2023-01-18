import { NeuronInterface } from "./NeuronInterface";

interface SynapseInterface {
    incomingConnection: NeuronInterface;

    outgoingConnection: NeuronInterface;

    previousIncomingConnection: NeuronInterface;

    previousOutgoingConnection: NeuronInterface;

    previousWeight: number;

    previousWeightChange: number;

    weight: number;

    weightChange: number;
}

interface SynapseConfiguration {}

export {
    SynapseConfiguration,
    SynapseInterface
}