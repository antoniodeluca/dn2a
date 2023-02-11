import { CerebrumFactory } from "./CerebrumFactory";
import { CerebrumConfiguration, CerebrumInterface } from "./CerebrumTypes";

interface BrainInterface {
    cerebrum: CerebrumInterface;
}

interface BrainConfiguration {
    cerebrum: {
        generator: CerebrumFactory;
        configuration?: CerebrumConfiguration;
    };
}

export { BrainConfiguration, BrainInterface };
