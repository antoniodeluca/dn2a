import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 32
});

import {Neuron} from "../neuron";
import {Synapse} from "../synapse";

let NetworkAlpha = function(configuration) {
    this.configuration = configuration || {
        layerDimensions: [2, 4, 1],
        learningMode: "stepbystep",
        learningRate: 0.3,
        momentumRate: 0.7,
        maximumError: 0.005,
        dataRepository: {},
        neuronGenerator: Neuron,
        synapseGenerator: Synapse
    };

    if (!this.checkConfiguration()) {
        throw "Invalid FFNNALFA Engine Configuration";
    }
    this.configuration = this.transformConfiguration();

    this.dataRepository = this.configuration.dataRepository;

    this.generateNeurons();
    this.generateSynapses();
}

NetworkAlpha.prototype = {
    checkConfiguration: function() {
        return true;
    },

    transformConfiguration: function() {
        return this.configuration;
    },

    generateNeurons: function() {
        let neuronLayers = [];
        _.forEach(this.configuration.layerDimensions, function(layerDimension) {
            let layerNeurons = [];
            let neuronScope = neuronLayers.length === 0 ? "input" : neuronLayers.length < (this.configuration.layerDimensions.length - 1) ? "hidden" : "output";
            _.times(layerDimension, function() {
                layerNeurons.push(this.generateNeuron(neuronScope));
            }.bind(this));
            if (neuronScope === "input" || neuronScope === "hidden") {
                layerNeurons.push(this.generateNeuron("bias"));
            }
            neuronLayers.push(layerNeurons);
        }.bind(this));
        this.dataRepository.neuronLayers = neuronLayers;
    },

    generateNeuron: function(scope) {
        let neuron = this.configuration.neuronGenerator();
        let proxy = scope === "input" ? true : false;
        let fixed = scope === "bias" ? true : false;
        let output = m.bignumber(fixed ? 1 : 0);
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
    },

    generateSynapses: function() {
        let previousLayerNeurons = [];
        _.forEach(this.dataRepository.neuronLayers, function(
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
                            let synapse = this.generateSynapse();
                            synapse.incomingConnection = previousLayerNeuron;
                            synapse.outgoingConnection = layerNeuron;
                            previousLayerNeuron.addOutgoingConnection(synapse);
                            layerNeuron.addIncomingConnection(synapse);
                        }.bind(this));
                    }
                }.bind(this));
            }
            previousLayerNeurons = layerNeurons;
        }.bind(this));
    },

    generateSynapse: function() {
        let synapse = this.configuration.synapseGenerator();
        return synapse;
    },

    setInputPattern: function(inputPattern) {
        _.forEach(this.dataRepository.neuronLayers[0], function(
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
        _.forEach(this.dataRepository.neuronLayers[0], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            inputPattern[layerNeuronIndex] = layerNeurons[layerNeuronIndex].output;
        });
        return inputPattern;
    },

    setExpectedOutputPattern: function(expectedOutputPattern) {
        _.forEach(this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].expectedOutput = m.bignumber(expectedOutputPattern[layerNeuronIndex]);
        });
    },

    getExpectedOutputPattern: function() {
        let expectedOutputPattern = [];
        _.forEach(this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            expectedOutputPattern[layerNeuronIndex] = layerNeuron.expectedOutput;
        });
        return expectedOutputPattern;
    },

    setOutputPattern: function(outputPattern) {
        _.forEach(this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].output = m.bignumber(outputPattern[layerNeuronIndex]);
        });
    },

    getOutputPattern: function() {
        let outputPattern = [];
        _.forEach(this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            outputPattern[layerNeuronIndex] = layerNeuron.output;
        });
        return outputPattern;
    },

    getOutputError: function() {
        let outputError = m.divide(
            _.reduce(
                this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1],
                function(totalOutputError, layerNeuron) {
                    return m.add(
                        totalOutputError,
                        m.square(layerNeuron.outputError)
                    );
                },
                m.bignumber(0)
            ),
            this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].length
        );
        return outputError;
    },

    calculateActivations: function() {
        _.forEach(this.dataRepository.neuronLayers, function(
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
                        layerNeuron.outputError = m.subtract(
                            layerNeuron.expectedOutput,
                            layerNeuron.output
                        );
                        layerNeuron.inputSum = 0;
                    }
                });
            }
        });
    },

    calculateDeltas: function() {
        _.forEachRight(this.dataRepository.neuronLayers, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            if (neuronLayerIndex > 0) {
                let layerNeurons = neuronLayers[neuronLayerIndex];
                if (neuronLayerIndex === (this.dataRepository.neuronLayers.length - 1)) {
                    _.forEach(layerNeurons, function(
                        layerNeuron,
                        layerNeuronIndex,
                        layerNeurons
                    ) {
                        layerNeuron.delta = m.chain(
                            layerNeuron.outputError
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
                        if (!layerNeuron.fixed) {
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
                        }
                    });
                }
            }
        }.bind(this));
    },

    calculateWeights: function(learningRate, momentumRate) {
        _.forEach(this.dataRepository.neuronLayers, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            if (neuronLayerIndex > 0) {
                let layerNeurons = neuronLayers[neuronLayerIndex];
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
                                synapse.previousWeightChange = synapse.weightChange;
                                synapse.weightChange = m.add(
                                    m.multiply(
                                        m.bignumber(learningRate),
                                        m.multiply(
                                            layerNeuron.delta,
                                            synapse.incomingConnection.output
                                        )
                                    ),
                                    m.multiply(
                                        m.bignumber(momentumRate),
                                        synapse.previousWeightChange
                                    )
                                );
                                synapse.previousWeight = synapse.weight;
                                synapse.weight = m.add(
                                    synapse.weight,
                                    synapse.weightChange
                                );
                            }
                        );
                    }
                });
            }
        });
    },

    train: function(trainingPatterns, callback) {
        let trainingStatus = {
            outputErrors: [],
            interruptionRequest: false,
            elapsedEpochCounter: 0
        };
        do {
            trainingStatus.outputErrors = [];
            trainingStatus.interruptionRequest = true;
            trainingStatus = _.reduce(
                trainingPatterns,
                function(trainingStatus, trainingPattern) {
                    this.setInputPattern(trainingPattern.input);
                    this.setExpectedOutputPattern(trainingPattern.output);
                    this.calculateActivations();
                    this.calculateDeltas();
                    this.calculateWeights(
                        this.configuration.learningRate,
                        this.configuration.momentumRate
                    );
                    let outputError = this.getOutputError();
                    trainingStatus.outputErrors.push(outputError);
                    trainingStatus.interruptionRequest = trainingStatus.interruptionRequest && m.smallerEq(outputError, m.bignumber(this.configuration.maximumError));
                    return trainingStatus;
                }.bind(this),
                trainingStatus
            );
            trainingStatus.elapsedEpochCounter++;
            if (callback) {
                callback(trainingStatus);
            }
        } while (this.configuration.learningMode === "continuous" && !trainingStatus.interruptionRequest);
    },

    query: function(queryingPatterns, callback) {
        let queryingStatus = {
            outputPatterns: []
        };
        _.forEach(queryingPatterns, function(queryingPattern) {
            this.setInputPattern(queryingPattern.input);
            this.calculateActivations();
            let outputPattern = this.getOutputPattern();
            queryingStatus.outputPatterns.push(outputPattern);
        }.bind(this));
        if (callback) {
            callback(queryingStatus);
        }
    }
}

export {NetworkAlpha};
