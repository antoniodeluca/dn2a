import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

import {NetworkAlpha} from "./networks/alpha";
import {Neuron} from "./neuron";
import {Synapse} from "./synapse";

let Cerebrum = function(configuration) {
    this.configuration = configuration || {
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
                        synapseGenerator: Synapse,
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
    };

    if (!this.checkConfiguration()) {
        throw "Invalid Cerebrum Configuration";
    }
    this.configuration = this.transformConfiguration();

    this.minds = [];

    this.inputs = []; // inputs are objects with the pattern and the name of the recipient mind (because there could be more than one listening for inputs)

    this.outputs = []; // outputs are objects with the pattern and the name of the source mind (because there could be more than one producing outputs)

    m.config({
        number: "BigNumber",
        precision: this.configuration.numbersPrecision
    });

    _.forEach(this.configuration.minds, function(configuration) {
        this.buildMind(configuration);
    }.bind(this));
}

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

    trainMind: function(trainingPatterns, callback, mindName = "defaultMind") {
        let mind = _.find(
            this.minds,
            {
                name: mindName
            }
        ).network;
        mind.train(trainingPatterns, callback);
    },

    queryMind: function(queryingPatterns, callback, mindName = "defaultMind") {
        let mind = _.find(
            this.minds,
            {
                name: mindName
            }
        ).network;
        mind.query(queryingPatterns, callback);
    }
};

export {Cerebrum};
