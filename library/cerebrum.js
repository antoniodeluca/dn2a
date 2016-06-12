import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 64
});

import {Network} from "./networks/ffnnalfa";

var Cerebrum = function(configuration) {
	configuration = configuration || {};
	this.configuration = {};
	this.configuration.minds = configuration.minds || [
		{
			name: "defaultMind", // a mind can be named only with chars and numbers without spaces and special symbols ("cerebrum" is a reserverd word)
			type: "ffnnalfa",
			inputsFrom: [
				"cerebrum"
			], // a mind can get inputs from cerebrum and/or one or more minds
			parameters: {
				layerDimensions: [2, 3, 3, 1],
				learningMode: "stepbystep", // could be continuous
				learningRate: 0.1,
				maximumError: 0.001
			}
		}
	];
	this.configuration.outputsFrom = [
		"defaultMind"
	]; // cerebrum can get outputs from one or more minds

	if (!this.checkConfiguration(this.configuration)) {
		throw "Invalid Cerebrum Configuration";
	}
	this.configuration = this.transformConfiguration(this.configuration);

	this.minds = [];

	this.inputs = []; // inputs are objects with the pattern and the name of the recipient mind (because there could be more than one listening for inputs)

	this.outputs = []; // outputs are objects with the pattern and the name of the source mind (because there could be more than one producing outputs)

	_.forEach(this.configuration.minds, function(mindConfiguration) {
		this.buildMind(mindConfiguration);
	}.bind(this));
}

Cerebrum.prototype = {
	checkConfiguration: function(configuration) {
		return true;
	},

	transformConfiguration: function(configuration) {
		return configuration;
	},

    buildMind: function(configuration) {
        let name = configuration.name
        let data = {};
        let code = new Network(configuration.parameters, data);
		let mind = {
			name: name,
            data: data,
			code: code
		};
        this.minds.push(mind);
    },

	trainMind: function(trainingPatterns, callback, mindName = "defaultMind") {
		let mind = _.find(
			this.minds,
			{
				name: mindName
			}
		).code;
		mind.train(trainingPatterns, callback);
	},

	queryMind: function(queryingPatterns, callback, mindName = "defaultMind") {
		let mind = _.find(
			this.minds,
			{
				name: mindName
			}
		).code;
		mind.query(queryingPatterns, callback);
	},

	query: function(queryingPatterns, callback) {

	}
}

export {Cerebrum};
