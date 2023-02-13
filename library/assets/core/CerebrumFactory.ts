import { NetworkFactory as NetworkAlphaFactory } from "@networks/alpha/NetworkFactory";
import { Calculator } from "@networks/types";

import { Cerebrum } from "./Cerebrum";
import { CerebrumConfiguration } from "./types";

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
