import { Calculator } from "@networks/types";

import { Synapse } from "./Synapse";
import { SynapseConfiguration } from "./types";

class SynapseFactory {
    private calculator: Calculator;

    private configuration: SynapseConfiguration;

    private getDefaultConfiguration() {
        return {} as SynapseConfiguration;
    }

    constructor(calculator: Calculator, configuration?: SynapseConfiguration) {
        this.calculator = calculator;

        this.configuration = configuration
            ? configuration
            : this.getDefaultConfiguration();
    }

    getInstance(configuration?: SynapseConfiguration) {
        if (configuration) {
            this.configuration = configuration;
        }

        return new Synapse(this.calculator, this.configuration);
    }
}

export { SynapseFactory };
