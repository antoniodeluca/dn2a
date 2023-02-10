import { Brain } from "./Brain";
import { BrainConfiguration } from "./BrainInterface";
import { CerebrumFactory } from "./CerebrumFactory";
import { Calculator } from "./networks/CalculatorInterface";

class BrainFactory {
    private calculator: Calculator;

    private configuration: BrainConfiguration;

    private getDefaultConfiguration() {
        const cerebrumFactory = new CerebrumFactory(this.calculator);

        return {
            cerebrum: {
                generator: cerebrumFactory,
            },
        } as BrainConfiguration;
    }

    constructor(calculator: Calculator, configuration?: BrainConfiguration) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: BrainConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new Brain(this.configuration);
    }
}

export { BrainFactory };
