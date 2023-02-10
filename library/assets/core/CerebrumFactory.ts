import { Cerebrum } from "./Cerebrum";
import { CerebrumConfiguration } from "./CerebrumInterface";
import { NetworkAlphaFactory } from "./networks/alpha/NetworkAlphaFactory";
import { Calculator } from "./networks/CalculatorInterface";

class CerebrumFactory {
    private calculator: Calculator;

    private configuration: CerebrumConfiguration;

    private getDefaultConfiguration() {
        const networkAlphaFactory = new NetworkAlphaFactory(this.calculator);

        return {
            minds: [
                {
                    name: "defaultMind",
                    network: {
                        generator: networkAlphaFactory,
                    },
                    inputsFrom: ["cerebrum"],
                },
            ],
            outputsFrom: ["defaultMind"],
        } as CerebrumConfiguration;
    }

    constructor(calculator: Calculator, configuration?: CerebrumConfiguration) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: CerebrumConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new Cerebrum(this.configuration);
    }
}

export { CerebrumFactory };
