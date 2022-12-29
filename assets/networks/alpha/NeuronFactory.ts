import { Neuron } from "./Neuron";
import { NeuronConfiguration } from "./NeuronInterface";
 
class NeuronFactory {
    static getInstance(configuration?: NeuronConfiguration) {
        return new Neuron(configuration)
    }
}

export {
    NeuronFactory
}