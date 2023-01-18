import { QueryingPatterns, TrainingPatterns } from "./InputOutputInterface"
import { NetworkAlphaConfiguration, NetworkAlphaInterface } from "./networks/alpha/NetworkAlphaInterface"
import { NetworkInterface } from "./networks/alpha/NetworkInterface"
 
interface CerebrumInterface {
    buildMind: (configuration: MindConfiguration) => void;

    trainMind: (trainingPatterns: TrainingPatterns, epochCallback?: Function, iterationCallback?: Function, mindName?: string) => void;

    queryMind: (queryingPatterns: QueryingPatterns, epochCallback?: Function, iterationCallback?: Function, mindName?: string) => void;
}

interface MindConfiguration {
    name: string;
    network: {
        generator: (configuration?: NetworkAlphaConfiguration) => NetworkAlphaInterface;
        configuration?: NetworkAlphaConfiguration;
    },
    inputsFrom: string[];
}

interface CerebrumConfiguration {
    minds: MindConfiguration[];
    outputsFrom: string[];
}

interface Mind {
    name: string;
    network: NetworkInterface;
}

export {
    CerebrumConfiguration,
    CerebrumInterface,
    Mind,
    MindConfiguration
}