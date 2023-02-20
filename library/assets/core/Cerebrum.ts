import {
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "@networks/types";

import {
    CerebrumConfiguration,
    CerebrumInterface,
    Network,
    NetworkConfiguration,
} from "./types";
import { QueryingInputPatterns, TrainingPatterns } from "./types";

class Cerebrum implements CerebrumInterface {
    private configuration: CerebrumConfiguration;

    private networks: Network[];

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }

    constructor(configuration: CerebrumConfiguration) {
        this.configuration = configuration;

        if (!this.checkConfiguration()) {
            throw "Invalid Cerebrum Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        this.networks = [];

        this.configuration.networks.forEach((configuration) => {
            this.buildNetwork(configuration);
        });
    }

    buildNetwork(configuration: NetworkConfiguration) {
        this.networks.push({
            name: configuration.name,
            code: configuration.code.generator.getInstance(
                configuration.code.configuration
            ),
        });
    }

    trainNetwork(
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback,
        networkName = "defaultNetwork"
    ) {
        const network = this.networks.find((network) => {
            return network.name === networkName;
        });

        if (network === undefined) {
            throw new Error("Network not found during training");
        }

        network.code.train(trainingPatterns, epochCallback, iterationCallback);
    }

    queryNetwork(
        queryingPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback,
        networkName = "defaultNetwork"
    ) {
        const network = this.networks.find((network) => {
            return network.name === networkName;
        });

        if (network === undefined) {
            throw new Error("Network not found during querying");
        }

        network.code.query(queryingPatterns, epochCallback, iterationCallback);
    }
}

export { Cerebrum };
