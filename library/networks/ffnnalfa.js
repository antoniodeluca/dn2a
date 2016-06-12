import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 64
});

import {Neuron} from "../neuron";
import {Synapse} from "../synapse";

var Network = function(configuration, data) {
    this.configuration = configuration || {
        layerDimensions: [2, 3, 3, 1],
        learningMode: "stepbystep", // could be continuous
        learningRate: 0.1,
        maximumError: 0.001
    };

    if (!this.checkConfiguration(this.configuration)) {
        throw "Invalid FFNNALFA Engine Configuration";
    }
    this.configuration = this.transformConfiguration(this.configuration);

    this.data = data || {};

    this.data.neurons = this.generateNeurons(this.configuration.layerDimensions, this.generateNeuron);
    this.generateSynapses(this.data.neurons, this.generateSynapse);
}

Network.prototype = {
    checkConfiguration: function(configuration) {
        return true;
    },

    transformConfiguration: function(configuration) {
        return configuration;
    },

    set neurons(value) {
        this.data.neurons = value;
    },

    get neurons() {
        return this.data.neurons;
    },

    setNeuron: function() {

    },

    getNeuron: function() {

    },

    addNeuron: function(value) {
        this.data.neurons.push(value);
    },

    set synapses(value) {

    },

    get synapses() {

    },

    setSynapse: function() {

    },

    getSynapse: function() {

    },

    generateNeurons: function(layerDimensions, neuronGenerator) {
        let neuronLayers = [];
        _.forEach(layerDimensions, function(layerDimension) {
            let layerNeurons = [];
            let neuronScope = neuronLayers.length === 0 ? "input" : neuronLayers.length < (layerDimensions.length - 1) ? "hidden" : "output";
            _.times(layerDimension, function() {
                layerNeurons.push(neuronGenerator(neuronScope));
            });
            if (neuronScope === "input" || neuronScope === "hidden") {
                layerNeurons.push(neuronGenerator("bias"));
            }
            neuronLayers.push(layerNeurons);
        });
        return neuronLayers;
    },

    generateNeuron: function(scope) {
        let neuron = Neuron();
        let proxy = scope === "input" ? true : false;
        let fixed = scope === "bias" ? true : false;
        let output = m.bignumber(fixed ? 1 : 0);
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
    },

    generateSynapses: function(neuronLayers, synapseGenerator) {
        let previousLayerNeurons = [];
        _.forEach(neuronLayers, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            let layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex > 0) {
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    if (!layerNeuron.fixed) {
                        _.forEach(previousLayerNeurons, function(
                            previousLayerNeuron,
                            previousLayerNeuronIndex,
                            previousLayerNeurons
                        ) {
                            let synapse = synapseGenerator();
                            synapse.incomingConnection = previousLayerNeuron;
                            synapse.outgoingConnection = layerNeuron;
                            previousLayerNeuron.addOutgoingConnection(synapse);
                            layerNeuron.addIncomingConnection(synapse);
                        });
                    }
                });
            }
            previousLayerNeurons = layerNeurons;
        });
    },

    generateSynapse: function() {
        let synapse = Synapse();
        return synapse;
    },

    setInputPattern: function(inputPattern) {
        _.forEach(this.data.neurons[0], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            if (!layerNeuron.fixed) {
                layerNeurons[layerNeuronIndex].output = m.bignumber(inputPattern[layerNeuronIndex]);
            }
        });
    },

    getInputPattern: function() {
        let inputPattern = [];
        _.forEach(this.data.neurons[0], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            inputPattern[layerNeuronIndex] = layerNeurons[layerNeuronIndex].output;
        });
        return inputPattern;
    },

    setExpectedOutputPattern: function(expectedOutputPattern) {
        _.forEach(this.data.neurons[this.data.neurons.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].expectedOutput = m.bignumber(expectedOutputPattern[layerNeuronIndex]);
        });
    },

    getExpectedOutputPattern: function() {
        let expectedOutputPattern = [];
        _.forEach(this.data.neurons[this.data.neurons.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            expectedOutputPattern[layerNeuronIndex] = layerNeuron.expectedOutput;
        });
        return expectedOutputPattern;
    },

    setOutputPattern: function(outputPattern) {
        _.forEach(this.data.neurons[this.data.neurons.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].output = m.bignumber(outputPattern[layerNeuronIndex]);
        });
    },

    getOutputPattern: function() {
        let outputPattern = [];
        _.forEach(this.data.neurons[this.data.neurons.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            outputPattern[layerNeuronIndex] = layerNeuron.output;
        });
        return outputPattern;
    },

    calculateActivations: function() {
        _.forEach(this.data.neurons, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            let layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex > 0) {
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    if (!layerNeuron.fixed) {
                        _.forEach(
                            layerNeuron.incomingConnections,
                            function(
                                synapse,
                                synapseIndex,
                                synapses
                            ) {
                                layerNeuron.inputSum = m.add(
                                    layerNeuron.inputSum,
                                    m.multiply(
                                        synapse.incomingConnection.output,
                                        synapse.weight
                                    )
                                );
                            }
                        );
                        layerNeuron.output = layerNeuron.transferFunction(layerNeuron.inputSum);
                        layerNeuron.inputSum = 0;
                    }
                });
            }
        });
    },

    calculateDeltas: function() {
        _.forEachRight(this.data.neurons, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            let layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex === (this.data.neurons.length - 1)) {
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    layerNeuron.delta = m.chain(
                        m.subtract(
                            layerNeuron.expectedOutput,
                            layerNeuron.output
                        )
                    ).multiply(
                        layerNeuron.output
                    ).multiply(
                        m.subtract(
                            m.bignumber(1),
                            layerNeuron.output
                        )
                    ).done();
                });
            } else {
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    layerNeuron.delta = m.chain(
                        _.reduce(
                            _.map(
                                layerNeuron.outgoingConnections,
                                function(synapse) {
                                    return m.multiply(
                                        synapse.weight,
                                        synapse.outgoingConnection.delta
                                    );
                                }
                            ),
                            function(accumulator, value) {
                                return m.add(
                                    accumulator,
                                    value
                                );
                            },
                            m.bignumber(0)
                        )
                    ).multiply(
                        layerNeuron.output
                    ).multiply(
                        m.subtract(
                            m.bignumber(1),
                            layerNeuron.output
                        )
                    ).done();
                });
            }
        }.bind(this));
    },

    calculateWeights: function() {
        _.forEach(this.data.neurons, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            let layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex < (neuronLayers.length - 1)) {
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    _.forEach(
                        layerNeuron.outgoingConnections,
                        function(
                            synapse,
                            synapseIndex,
                            synapses
                        ) {
                            synapse.weight = m.add(
                                synapse.weight,
                                m.multiply(
                                    m.bignumber(0.5),
                                    m.multiply(
                                        synapse.outgoingConnection.delta,
                                        layerNeuron.output
                                    )
                                )
                            );
                        }
                    );
                });
            }
        });
    },

    train: function(trainingPatterns, callback) {
        _.forEach(trainingPatterns, function(trainingPattern) {
            this.setInputPattern(trainingPattern.input);
            this.setExpectedOutputPattern(trainingPattern.output);
            this.calculateActivations();
            this.calculateDeltas();
            this.calculateWeights();
            let outputPattern = this.getOutputPattern();
            callback(outputPattern);
        }.bind(this));
    },

    query: function(queryingPatterns, callback) {
        _.forEach(queryingPatterns, function(queryingPattern) {
            let outputPattern = this.getOutputPattern(queryingPattern.input);
            callback(outputPattern);
        }.bind(this));
    }
}

export {Network};
