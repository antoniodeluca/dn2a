import { BigNumber } from "mathjs";
 
import { SynapseInterface } from "./SynapseInterface";

interface NeuronInterface {
    delta: BigNumber

    expectedOutput: BigNumber

    fixed: boolean

    incomingConnections: SynapseInterface[]

    inputSum: BigNumber

    inputs: number[]

    outgoingConnections: SynapseInterface[]

    output: BigNumber
    toString
    outputError: BigNumber

    previousExpectedOutput: BigNumber

    previousIncomingConnections: SynapseInterface[]

    previousInputSum: BigNumber

    previousInputs: number[]

    previousOutgoingConnections: SynapseInterface[]

    previousOutput: BigNumber

    previousOutputError: BigNumber

    proxy: boolean

    transferFunction: (value: BigNumber) => BigNumber 

    addIncomingConnection: (value: SynapseInterface) => void

    addOutgoingConnection: (value: SynapseInterface) => void

    addPreviousIncomingConnection: (value: SynapseInterface) => void

    addPreviousOutgoingConnection: (value: SynapseInterface) => void
}

interface NeuronConfiguration {
    numbersPrecision: number
}

export {
    NeuronConfiguration,
    NeuronInterface
}