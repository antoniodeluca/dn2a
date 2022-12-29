import { CerebrumFactory } from "./CerebrumFactory";
import { BrainConfiguration, BrainInterface } from "./BrainInterface";
import { CerebrumInterface } from "./CerebrumInterface";
 
class Brain implements BrainInterface {
    private defaultConfiguration = {
        cerebrum: {
            generator: CerebrumFactory.getInstance
        }
    } as BrainConfiguration;

    private configuration: BrainConfiguration;

    private _cerebrum: CerebrumInterface;

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }
    
    constructor(configuration?: BrainConfiguration) {
        this.configuration = configuration ? configuration : this.defaultConfiguration;

        if (!this.checkConfiguration()) {
            throw "Invalid Brain Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        this._cerebrum = this.configuration.cerebrum.generator(this.configuration.cerebrum.configuration);
    }

    set cerebrum(value) {
        this._cerebrum = value;
    }

    get cerebrum() {
        return this._cerebrum;
    }
}

export {
    Brain
}
