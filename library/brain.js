import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 32
});

import {Cerebrum} from "./cerebrum";
import {NetworkAlpha} from "./networks/ffnnalfa";
import {Neuron} from "./neuron";
import {Synapse} from "./synapse";

let Brain = function(configuration) {
    this.configuration = configuration || {
        cerebrum: {
            generator: Cerebrum,
            configuration: {
                minds: [
                    {
                        name: "defaultMind",
                        network: {
                            generator: NetworkAlpha,
                            configuration: {
                                layerDimensions: [2, 4, 1],
                                learningMode: "stepbystep",
                                learningRate: 0.3,
                                momentumRate: 0.7,
                                maximumError: 0.005,
                                dataRepository: {},
                                neuronGenerator: Neuron,
                                synapseGenerator: Synapse
                            }
                        },
                        inputsFrom: [
                            "cerebrum"
                        ]
                    }
                ],
                outputsFrom: [
                    "defaultMind"
                ]
            }
        }
    };

    this.cerebrum = new this.configuration.cerebrum.generator(this.configuration.cerebrum.configuration);
};

export {Brain};
