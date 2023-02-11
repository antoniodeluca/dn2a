import { BrainConfiguration, BrainInterface } from "./BrainTypes";
import { CerebrumInterface } from "./CerebrumTypes";

class Brain implements BrainInterface {
    private configuration: BrainConfiguration;

    private _cerebrum: CerebrumInterface;

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }

    constructor(configuration: BrainConfiguration) {
        this.configuration = configuration;

        if (!this.checkConfiguration()) {
            throw "Invalid Brain Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        this._cerebrum = this.configuration.cerebrum.generator.getInstance(
            this.configuration.cerebrum.configuration
        );
    }

    set cerebrum(value) {
        this._cerebrum = value;
    }

    get cerebrum() {
        return this._cerebrum;
    }
}

export { Brain };
