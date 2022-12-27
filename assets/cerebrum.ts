import {create, all} from "mathjs";

import { NetworkAlpha } from "./networks/alpha";
import { Neuron } from "./neuron";
import { Synapse } from "./synapse";

const mathjs = create(all);

const Cerebrum = function(configuration?) {
    this.configuration = configuration || {
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
                        numbersPrecision: 64
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
    };

    if (!this.checkConfiguration()) {
        throw "Invalid Cerebrum Module Configuration";
    }
    this.configuration = this.transformConfiguration();

    this.minds = [];

    this.inputs = []; // inputs are objects with the pattern and the name of the recipient mind (because there could be more than one listening for inputs)

    this.outputs = []; // outputs are objects with the pattern and the name of the source mind (because there could be more than one producing outputs)

    mathjs.config({
        number: "BigNumber",
        // precision: this.configuration.numbersPrecision
    });

    this.configuration.minds.forEach(function(configuration) {
        this.buildMind(configuration);
    }.bind(this));
};

Cerebrum.prototype = {
    checkConfiguration: function() {
        return true;
    },

    transformConfiguration: function() {
        return this.configuration;
    },

    buildMind: function(configuration) {
        this.minds.push({
            name: configuration.name,
            network: new configuration.network.generator(configuration.network.configuration)
        });
    },

    trainMind: function(
        trainingPatterns,
        epochCallback,
        iterationCallback,
        mindName = "defaultMind"
    ) {
        const mind = this.minds.find(function(mind) {
            return mind.name === mindName;
        }).network;
        mind.train(
            trainingPatterns,
            epochCallback,
            iterationCallback
        );
    },

    queryMind: function(
        queryingPatterns,
        epochCallback,
        iterationCallback,
        mindName = "defaultMind"
    ) {
        const mind = this.minds.find(function(mind) {
            return mind.name === mindName;
        }).network;
        mind.query(
            queryingPatterns,
            epochCallback,
            iterationCallback
        );
    }
};

export {
    Cerebrum
};
