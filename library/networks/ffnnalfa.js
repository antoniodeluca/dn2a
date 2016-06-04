import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

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
	this.data.synapses = this.generateSynapses(this.data.neurons, this.generateSynapse);
	// console.log(JSON.stringify(this.data.neurons, null, 4));
	// console.log(JSON.stringify(this.data.synapses, null, 4));
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
        this.data.synapses = value;
    },

    get synapses() {
        return this.data.synapses;
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
        let output = fixed ? 1 : 0;
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
	},

	generateSynapses: function(neuronLayers, synapseGenerator) {
		let synapseLayers = [];
		let previousLayerNeurons = [];
		_.forEach(neuronLayers, function(layerNeurons) {
            if (previousLayerNeurons.length > 0) {
    			let layerSynapseGroups = [];
    			_.forEach(layerNeurons, function(layerNeuron) {
                    if (!layerNeuron.fixed) {
    				    let groupSynapses = [];
    				    _.forEach(previousLayerNeurons, function(previousLayerNeuron) {
                            let synapse = synapseGenerator();
    						groupSynapses.push(synapse);
                            synapse.incomingConnection = previousLayerNeuron;
                            synapse.outgoingConnection = layerNeuron;
                            previousLayerNeuron.addOutgoingConnection(synapse);
                            layerNeuron.addIncomingConnection(synapse);
    				    });
                        layerSynapseGroups.push(groupSynapses);
                    }
    			});
    			synapseLayers.push(layerSynapseGroups);
            }
			previousLayerNeurons = layerNeurons;
		});
		return synapseLayers;
	},

	generateSynapse: function() {
        let synapse = Synapse();
		let weight = 1 - (Math.random() * 2);
        synapse.weight = weight;
		return synapse;
	},

    setInputPattern: function(inputPattern) {
        _.forEach(this.data.neurons[0], function(
            layerNeuron,
            layerNeuronIndex,
            layerNeurons
        ) {
            if (!layerNeuron.fixed) {
                layerNeurons[layerNeuronIndex].output = inputPattern[layerNeuronIndex];
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
            layerNeurons[layerNeuronIndex].expectedOutput = expectedOutputPattern[layerNeuronIndex];
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
            layerNeurons[layerNeuronIndex].output = outputPattern[layerNeuronIndex];
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

    propagateInputPattern: function() {
        let previousNeuronLayer = [];
        _.forEach(this.data.neurons, function(
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
                        let groupSynapses = this.data.synapses[neuronLayerIndex - 1][layerNeuronIndex];
                        let previousLayerNeurons = previousNeuronLayer;
                        _.forEach(previousLayerNeurons, function(
                            previousLayerNeuron,
                            previousLayerNeuronIndex,
                            previousLayerNeurons
                        ) {
                            layerNeurons[layerNeuronIndex].inputSum += previousLayerNeurons[previousLayerNeuronIndex].output * groupSynapses[previousLayerNeuronIndex].weight;
                        });
                        layerNeurons[layerNeuronIndex].output = layerNeurons[layerNeuronIndex].inputSum;
                    }
                }.bind(this));
            }
            previousNeuronLayer = neuronLayers[neuronLayerIndex];
        }.bind(this));
	},

    propagateOutputError: function() {
        let previousNeuronLayer = [];
        _.forEachRight(this.data.neurons, function(
            neuronLayer,
            neuronLayerIndex,
            neuronLayers
        ) {
            if (neuronLayerIndex === (this.data.neurons.length - 1)) {
                let layerNeurons = neuronLayers[neuronLayerIndex];
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    layerNeurons[layerNeuronIndex].outputError = layerNeurons[layerNeuronIndex].output * (1 - layerNeurons[layerNeuronIndex].output) * (layerNeurons[layerNeuronIndex].expectedOutput - layerNeurons[layerNeuronIndex].output);
                });
            } else {
                let layerNeurons = neuronLayers[neuronLayerIndex];
                _.forEach(layerNeurons, function(
                    layerNeuron,
                    layerNeuronIndex,
                    layerNeurons
                ) {
                    if (!layerNeuron.fixed) {
                        let groupSynapses = this.data.synapses[neuronLayerIndex][layerNeuronIndex];
                        let previousLayerNeurons = previousNeuronLayer;
                        _.forEach(previousLayerNeurons, function(
                            previousLayerNeuron,
                            previousLayerNeuronIndex,
                            previousLayerNeurons
                        ) {
                            layerNeurons[layerNeuronIndex].outputError = layerNeurons[layerNeuronIndex].output * (1 - layerNeurons[layerNeuronIndex].output); // * ()
                        });
                    }
                }.bind(this));
            }
            previousNeuronLayer = neuronLayers[neuronLayerIndex];
        }.bind(this));
    },

    optimizeWeights: function() {

    },

	train: function(trainingPatterns, callback) {
		_.forEach(trainingPatterns, function(trainingPattern) {
            this.setInputPattern(trainingPattern.input);
            this.setExpectedOutputPattern(trainingPattern.output);
            this.propagateInputPattern();
            this.propagateOutputError();
            this.optimizeWeights();
            let outputPattern = this.getOutputPattern();
            console.log(outputPattern);
            // console.log(JSON.stringify(this.data.neurons, null, 4));
            // console.log(JSON.stringify(this.data.synapses, null, 4));
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
