import { Calculator } from "../CalculatorInterface";
import { Neuron } from "./Neuron";
import { NeuronConfiguration } from "./NeuronInterface";

class NeuronFactory {
    private calculator: Calculator;

    private configuration: NeuronConfiguration;

    private getDefaultConfiguration() {
        return {} as NeuronConfiguration;
    }

    constructor(calculator: Calculator, configuration?: NeuronConfiguration) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: NeuronConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new Neuron(this.calculator, this.configuration);
    }
}

export { NeuronFactory };
