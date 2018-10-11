import * as m from "mathjs";

import {Cerebrum} from "./cerebrum";
import {NetworkAlpha} from "./networks/alpha";
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
                                learningMode: "continuous",
                                learningRate: 0.3,
                                momentumRate: 0.7,
                                maximumError: 0.005,
                                maximumEpoch: 1000,
                                dataRepository: {},
                                neuron: {
                                    generator: Neuron
                                },
                                synapse: {
                                    generator: Synapse
                                },
                                numbersPrecision: 32
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

    if (!this.checkConfiguration()) {
        throw "Invalid Brain Module Configuration";
    }
    this.configuration = this.transformConfiguration();

    m.config({
        number: "BigNumber",
        precision: this.configuration.numbersPrecision
    });

    this.cerebrum = new this.configuration.cerebrum.generator(this.configuration.cerebrum.configuration);
};

Brain.prototype = {
    checkConfiguration: function() {
        return true;
    },

    transformConfiguration: function() {
        return this.configuration;
    }
};

export {Brain};
