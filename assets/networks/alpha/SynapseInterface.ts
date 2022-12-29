import { BigNumber } from "mathjs";
 
import { NeuronInterface } from "./NeuronInterface";

interface SynapseInterface {
    incomingConnection: NeuronInterface

    outgoingConnection: NeuronInterface

    previousIncomingConnection: NeuronInterface

    previousOutgoingConnection: NeuronInterface

    previousWeight: BigNumber

    previousWeightChange: BigNumber

    weight: BigNumber

    weightChange: BigNumber
}toString

interface SynapseConfiguration {
    numbersPrecision: number
}

export {
    SynapseConfiguration,
    SynapseInterface
}