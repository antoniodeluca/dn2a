import { CerebrumConfiguration, CerebrumInterface } from "./CerebrumInterface"
 
interface BrainInterface {
    cerebrum: CerebrumInterface
}

interface BrainConfiguration {
    cerebrum: {
        generator: (configuration?: CerebrumConfiguration) => CerebrumInterface,
        configuration?: CerebrumConfiguration
    }
}

export {
    BrainConfiguration,
    BrainInterface
}
