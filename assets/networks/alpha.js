import forEachRight from "lodash.foreachright";
import times from "lodash.times";
import {
    add,
    bignumber,
    chain,
    config,
    divide,
    multiply,
    number,
    smallerEq,
    square,
    subtract
} from "mathjs";

import Neuron from "../neuron";
import Synapse from "../synapse";

const NetworkAlpha = function(configuration) {
    this.configuration = configuration || {
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
    };

    if (!this.checkConfiguration()) {
        throw "Invalid NetworkAlpha Module Configuration";
    }
    this.configuration = this.transformConfiguration();

    this.dataRepository = this.configuration.dataRepository;

    this.neuronGenerator = this.configuration.neuron.generator({
        numbersPrecision: this.configuration.numbersPrecision
    });

    this.synapseGenerator = this.configuration.synapse.generator({
        numbersPrecision: this.configuration.numbersPrecision
    });

    config({
        number: "BigNumber",
        precision: this.configuration.numbersPrecision
    });

    this.generateNeurons();
    this.generateSynapses();
};

NetworkAlpha.prototype = {
    checkConfiguration: function() {
        return true;
    },

    transformConfiguration: function() {
        return this.configuration;
    },

    generateNeurons: function() {
        const neuronLayers = [];
        this.configuration.layerDimensions.forEach(function(layerDimension) {
            const layerNeurons = [];
            const neuronScope = neuronLayers.length === 0 ? "input" : neuronLayers.length < (this.configuration.layerDimensions.length - 1) ? "hidden" : "output";
            times(layerDimension, function() {
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
        const neuron = new this.neuronGenerator();
        const proxy = scope === "input" ? true : false;
        const fixed = scope === "bias" ? true : false;
        const output = bignumber(fixed ? 1 : 0);
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
    },

    generateSynapses: function() {
        let previousLayerNeurons = [];
        this.dataRepository.neuronLayers.forEach(function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            const layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex > 0) {
                layerNeurons.forEach(function(
                    layerNeuron
                ) {
                    if (!layerNeuron.fixed) {
                        previousLayerNeurons.forEach(function(
                            previousLayerNeuron
                        ) {
                            const synapse = this.generateSynapse();
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
        const synapse = new this.synapseGenerator();
        return synapse;
    },

    setInputPattern: function(inputPattern) {
        this.dataRepository.neuronLayers[0].forEach(function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            if (!layerNeuron.fixed) {
                layerNeurons[layerNeuronIndex].output = bignumber(inputPattern[layerNeuronIndex]);
            }
        });
    },

    getInputPattern: function() {
        const inputPattern = [];
        this.dataRepository.neuronLayers[0].forEach(function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            // inputPattern[layerNeuronIndex] = number(layerNeurons[layerNeuronIndex].output);
            inputPattern[layerNeuronIndex] = layerNeurons[layerNeuronIndex].output;
        });
        return inputPattern;
    },

    setExpectedOutputPattern: function(expectedOutputPattern) {
        this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].forEach(function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].expectedOutput = bignumber(expectedOutputPattern[layerNeuronIndex]);
        });
    },

    getExpectedOutputPattern: function() {
        const expectedOutputPattern = [];
        this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].forEach(function(
            layerNeuron,
            layerNeuronIndex
        ) {
            expectedOutputPattern[layerNeuronIndex] = number(layerNeuron.expectedOutput);
            // expectedOutputPattern[layerNeuronIndex] = layerNeuron.expectedOutput;
        });
        return expectedOutputPattern;
    },

    setOutputPattern: function(outputPattern) {
        this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].forEach(function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            layerNeurons[layerNeuronIndex].output = bignumber(outputPattern[layerNeuronIndex]);
        });
    },

    getOutputPattern: function() {
        const outputPattern = [];
        this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].forEach(function(
            layerNeuron,
            layerNeuronIndex
        ) {
            outputPattern[layerNeuronIndex] = number(layerNeuron.output);
            // outputPattern[layerNeuronIndex] = layerNeuron.output;
        });
        return outputPattern;
    },

    getOutputError: function() {
        const outputError = // number(
            divide(
                this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].reduce(
                    function(totalOutputError, layerNeuron) {
                        return add(
                            totalOutputError,
                            square(layerNeuron.outputError)
                        );
                    },
                    bignumber(0)
                ),
                this.dataRepository.neuronLayers[this.dataRepository.neuronLayers.length - 1].length
            );
        // );
        return outputError;
    },

    calculateActivations: function() {
        this.dataRepository.neuronLayers.forEach(function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            const layerNeurons = neuronLayers[neuronLayerIndex];
            if (neuronLayerIndex > 0) {
                layerNeurons.forEach(function(
                    layerNeuron
                ) {
                    if (!layerNeuron.fixed) {
                        layerNeuron.incomingConnections.forEach(
                            function(
                                synapse
                            ) {
                                layerNeuron.inputSum = add(
                                    layerNeuron.inputSum,
                                    multiply(
                                        synapse.incomingConnection.output,
                                        synapse.weight
                                    )
                                );
                            }
                        );
                        layerNeuron.output = layerNeuron.transferFunction(layerNeuron.inputSum);
                        layerNeuron.outputError = subtract(
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
        forEachRight(this.dataRepository.neuronLayers, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            if (neuronLayerIndex > 0) {
                const layerNeurons = neuronLayers[neuronLayerIndex];
                if (neuronLayerIndex === (this.dataRepository.neuronLayers.length - 1)) {
                    layerNeurons.forEach(function(
                        layerNeuron
                    ) {
                        layerNeuron.delta = chain(
                            layerNeuron.outputError
                        ).multiply(
                            layerNeuron.output
                        ).multiply(
                            subtract(
                                bignumber(1),
                                layerNeuron.output
                            )
                        ).done();
                    });
                } else {
                    layerNeurons.forEach(function(
                        layerNeuron
                    ) {
                        if (!layerNeuron.fixed) {
                            layerNeuron.delta = chain(
                                layerNeuron.outgoingConnections.map(
                                    function(synapse) {
                                        return multiply(
                                            synapse.weight,
                                            synapse.outgoingConnection.delta
                                        );
                                    }
                                ).reduce(
                                    function(accumulator, value) {
                                        return add(
                                            accumulator,
                                            value
                                        );
                                    },
                                    bignumber(0)
                                )
                            ).multiply(
                                layerNeuron.output
                            ).multiply(
                                subtract(
                                    bignumber(1),
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
        this.dataRepository.neuronLayers.forEach(function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            if (neuronLayerIndex > 0) {
                const layerNeurons = neuronLayers[neuronLayerIndex];
                layerNeurons.forEach(function(
                    layerNeuron
                ) {
                    if (!layerNeuron.fixed) {
                        layerNeuron.incomingConnections.forEach(
                            function(
                                synapse
                            ) {
                                synapse.previousWeightChange = synapse.weightChange;
                                synapse.weightChange = add(
                                    multiply(
                                        bignumber(learningRate),
                                        multiply(
                                            layerNeuron.delta,
                                            synapse.incomingConnection.output
                                        )
                                    ),
                                    multiply(
                                        bignumber(momentumRate),
                                        synapse.previousWeightChange
                                    )
                                );
                                synapse.previousWeight = synapse.weight;
                                synapse.weight = add(
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

    train: function(
        trainingPatterns,
        epochCallback,
        iterationCallback
    ) {
        let trainingStatus = {
            outputErrors: [],
            interruptionRequest: false,
            elapsedEpochCounter: 0,
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [],
                output: [],
                error: []
            }
        };
        do {
            trainingStatus.outputErrors = [];
            trainingStatus.interruptionRequest = true;
            trainingStatus.elapsedIterationCounter = 0;
            trainingStatus = trainingPatterns.reduce(
                function(
                    trainingStatus,
                    trainingPattern
                ) {
                    this.setInputPattern(trainingPattern.input);
                    this.setExpectedOutputPattern(trainingPattern.output);
                    this.calculateActivations();
                    this.calculateDeltas();
                    this.calculateWeights(
                        this.configuration.learningRate,
                        this.configuration.momentumRate
                    );
                    const outputError = this.getOutputError();
                    trainingStatus.outputErrors.push(outputError);
                    trainingStatus.interruptionRequest = trainingStatus.interruptionRequest && smallerEq(outputError, bignumber(this.configuration.maximumError));
                    trainingStatus.elapsedIterationCounter++;
                    trainingStatus.elapsedIterationPattern.input = trainingPattern.input;
                    trainingStatus.elapsedIterationPattern.target = this.getExpectedOutputPattern();
                    trainingStatus.elapsedIterationPattern.output = this.getOutputPattern();
                    trainingStatus.elapsedIterationPattern.error = outputError;
                    if (iterationCallback) {
                        iterationCallback(trainingStatus);
                    }
                    return trainingStatus;
                }.bind(this),
                trainingStatus
            );
            trainingStatus.elapsedEpochCounter++;
            if (epochCallback) {
                epochCallback(trainingStatus);
            }
        } while (
            this.configuration.learningMode === "continuous" &&
            !trainingStatus.interruptionRequest &&
            trainingStatus.elapsedEpochCounter < this.configuration.maximumEpoch
        );
    },

    query: function(
        inputPatterns,
        epochCallback,
        iterationCallback
    ) {
        const queryingStatus = {
            outputPatterns: [],
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [],
                output: []
            }
        };
        inputPatterns.forEach(function(inputPattern) {
            this.setInputPattern(inputPattern);
            this.calculateActivations();
            const outputPattern = this.getOutputPattern();
            queryingStatus.outputPatterns.push(outputPattern);
            queryingStatus.elapsedIterationCounter++;
            queryingStatus.elapsedIterationPattern.input = inputPattern;
            queryingStatus.elapsedIterationPattern.output = outputPattern;
            if (iterationCallback) {
                iterationCallback(queryingStatus);
            }
        }.bind(this));
        if (epochCallback) {
            epochCallback(queryingStatus);
        }
    }
};

export default NetworkAlpha;
