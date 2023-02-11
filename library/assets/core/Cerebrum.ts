import {
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "@networks/types";

import {
    CerebrumConfiguration,
    CerebrumInterface,
    Mind,
    MindConfiguration,
} from "./CerebrumTypes";
import {
    QueryingInputPatterns,
    TrainingPatterns,
} from "./InputOutputInterface";

class Cerebrum implements CerebrumInterface {
    private configuration: CerebrumConfiguration;

    private minds: Mind[];

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

        this.minds = [];

        this.configuration.minds.forEach((configuration) => {
            this.buildMind(configuration);
        });
    }

    buildMind(configuration: MindConfiguration) {
        this.minds.push({
            name: configuration.name,
            network: configuration.network.generator.getInstance(
                configuration.network.configuration
            ),
        });
    }

    trainMind(
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback,
        mindName = "defaultMind"
    ) {
        const mind = this.minds.find((mind) => {
            return mind.name === mindName;
        });

        if (mind === undefined) {
            throw new Error("Mind not found during training");
        }

        mind.network.train(trainingPatterns, epochCallback, iterationCallback);
    }

    queryMind(
        queryingPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback,
        mindName = "defaultMind"
    ) {
        const mind = this.minds.find((mind) => {
            return mind.name === mindName;
        });

        if (mind === undefined) {
            throw new Error("Mind not found during querying");
        }

        mind.network.query(queryingPatterns, epochCallback, iterationCallback);
    }
}

export { Cerebrum };
