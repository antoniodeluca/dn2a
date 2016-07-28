# DN2A - Digital Neural Network Architecture #

---

## About ##

DN2A is a set of highly decoupled JavaScript modules for Neural Networks and Artificial Intelligence development.

Each module is based on injection by configuration so that you can use just one as well as the complete set.

DN2A aims to allow you to create and train simple Neural Networks as well as very powerful chain of "minds" through which better abstract your dataset(s) and then the capacity of your whole Artificial Intelligence system. Moreover DN2A has been thought keeping in mind the additional future goal of representing the networks and the relative data as combinable string strains that will be usable for working with genetics techniques.

----------

## Features ##

- **Modularized components**: helps the development and the clear separation of concerns with great benefits for who wants to use mixed solutions.
- **Configurable computation precision**: helps to avoid the noise deriving from operation errors and default system precision limits with great improvement of the learning speed and performance stability.
- **Configuration checker**: helps to write less details about configuration and to keep compatibility with older version while the project evolves.
- **StepByStep or Continuous training**: helps to train neural networks without being limited to a particular approach for the greater good of projects with very complex project's needs. 
- TODO (Bios) **Data normalization**: helps to simplify the interaction within your real domain. 
- TODO (Host) **Networks composition**: helps to create very effective architectures of multiple neural networks able to obtain advanced behaviours like in deep learning.
- TODO (Host) **Computation parallelization**: helps to improve the scalability of your whole system.
- TODO (Bios) **Sessions intercommunication**: helps to improve the scalability of your whole system.

----------

## Modules ##

### Node (Neuron) ###
Module able to facilitate the representation of the data structure around Neurons and to hold relative common functionalities.

### Link (Synapse) ###
Module able to facilitate the representation of the data structure around Synapses and to hold relative common functionalities.

### Network (Neural Network or Cortical Column) ###
Module, available in different variations, able to use Neurons and Synapses to implement configurable and autonomous Neural Networks.

#### Available Network Types ####

01. **Alpha**: standard feed forward neural network with error back propagation controlled by layer dimensions, learning mode, learning rate, momentum rate, maximum allowed error and maximum number of epochs.
02. **beta**: TODEFINE & TODO
03. **gamma**: TODEFINE & TODO
04. **delta**: TODEFINE & TODO
05. **epsilon**: TODEFINE & TODO
06. **zeta**: TODEFINE & TODO
07. **eta**: TODEFINE & TODO
08. **theta**: TODEFINE & TODO
09. **iota**: TODEFINE & TODO
10. **kappa**: TODEFINE & TODO
11. **lambda**: TODEFINE & TODO
12. **mu**: TODEFINE & TODO
13. **nu**: TODEFINE & TODO
14. **xi**: TODEFINE & TODO
15. **omicron**: TODEFINE & TODO
16. **pi**: TODEFINE & TODO
17. **rho**: TODEFINE & TODO
18. **sigma**: TODEFINE & TODO
19. **tau**: TODEFINE & TODO
20. **upsilon**: TODEFINE & TODO
21. **phi**: TODEFINE & TODO
22. **chi**: TODEFINE & TODO
23. **psi**: TODEFINE & TODO
24. **omega**: TODEFINE & TODO

### Host (Cerebrum) ###
Module for the management of multiple Neural Networks in terms of intercommunication, chained training/querying and parallel computing through Web Workers.

### Bios (Brain) ###
Module for the normalization of data, interconnection with other external software, communication betweeen installations and monitoring of the whole architecture.

----------

## Tutorials ##

### Using in Node  ###

To install the library through NPM:

	npm install dn2a

To get the library directly from the GitHub repository:

	git clone https://github.com/harthur/brain.git
	npm run transpile

To import from the NPM library in ES5:

	var DN2A = require("dn2a");

To import directly from the local repository in ES5:

	var DN2A = require("[path-of-the-repository]/built/dn2a");

To import from the NPM library in ES6:

	import * as DN2A from ("dn2a");

To import directly from the local repository in ES6:

	import * as DN2A from ("[path-of-the-repository]/built/dn2a");

### Using in the Browser ###

To install the library through NPM:

	npm install dn2a

To install the library through Bower:

	bower install dn2a

To import from the NPM library:

	<script src="[path-of-the-library]/bundle/dn2a.browser.js" type="text/javascript"></script>

To import from the Bower library:

	<script src="[path-of-the-library]/bundle/dn2a.browser.js" type="text/javascript"></script>

To import directly from the local repository:

	<script src="[path-of-the-repository]/bundle/dn2a.browser.js" type="text/javascript"></script>

To import through your preferred loader configure it to point to the right place.

### Training/Querying a Network with default parametrization ###

	// Importation	
	var DN2A = require("../built/dn2a");
	
	// Instantiation
	var neuralNetwork = new DN2A.NetworkAlpha();
	
	// Training
	var trainingPatterns = [
	    {
	        input: [0, 0],
	        output: [0]
	    },
	    {
	        input: [0, 1],
	        output: [1]
	    },
	    {
	        input: [1, 0],
	        output: [1]
	    },
	    {
	        input: [1, 1],
	        output: [0]
	    }
	];
	neuralNetwork.train(trainingPatterns);
	
	// Querying
	//
	// The object passed to the callback function contains information about the querying process.
	var inputPatterns = [
	    [0, 0],
	    [0, 1],
	    [1, 0],
	    [1, 1]
	];
	neuralNetwork.query(inputPatterns, function(queryingStatus) {
	    inputPatterns.forEach(function(inputPatten, inputPatternIndex) {
	        console.log("[" + inputPatterns[inputPatternIndex].join(", ") + "] => [" + queryingStatus.outputPatterns[inputPatternIndex].join(", ") + "]");
	    });
	});

### Training/Querying a Network with custom parametrization ###

	// Importation
	// ...
	
	// Instantiation
	//
	// The object passed to the constructor function contains properties describing the neural network. 
	// The list of the properties is reported in the main README file.
	// In case one or more properties are not present they are substituted with defaults. 
	// Same thing happens if the object is not passed at all. 
	var neuralNetwork = new DN2A.NetworkAlpha({
	    layerDimensions: [2, 4, 4, 1], // the default would be [2, 4, 1]
	    learningMode: "continuous",
	    learningRate: 0.3,
	    momentumRate: 0.7,
	    maximumError: 0.005,
	    maximumEpoch: 20000, // the default would be 1000
	    dataRepository: {},
	    neuron: {
	        generator: DN2A.Neuron
	    },
	    synapse: {
	        generator: DN2A.Synapse
	    },
	    numbersPrecision: 32
	});
	
	// Training
	// ...
	
	// Querying
	// ...

### Training/Querying a Network with evolution feedback ###

	// Importation
	// ...
	
	// Instantiation
	// ...
	
	// Training
	//
	// The object passed to the callback function contains information about the training process.
	// The list of the properties is reported in the main README file.
	var trainingPatterns = [
	    {
	        input: [0, 0],
	        output: [0]
	    },
	    {
	        input: [0, 1],
	        output: [1]
	    },
	    {
	        input: [1, 0],
	        output: [1]
	    },
	    {
	        input: [1, 1],
	        output: [0]
	    }
	];
	neuralNetwork.train(trainingPatterns, function(trainingStatus) {
	    console.log("Epoch: " + trainingStatus.elapsedEpochCounter);
	});
	
	// Querying
	// ...

### Training/Querying a specific Network through the Host ###

	// Importation
	// ...
	
	// Instantiation
	var cerebrum = new DN2A.Cerebrum({
	    minds: [
	        {
	            name: "firstNeuralNetwork",
	            network: {
	                generator: DN2A.NetworkAlpha,
	                configuration: {
	                    layerDimensions: [2, 4, 1],
	                    learningMode: "continuous",
	                    learningRate: 0.3,
	                    momentumRate: 0.7,
	                    maximumError: 0.005,
	                    maximumEpoch: 1000,
	                    dataRepository: {},
	                    neuron: {
	                        generator: DN2A.Neuron
	                    },
	                    synapse: {
	                        generator: DN2A.Synapse
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
	        "firstNeuralNetwork"
	    ]
	});
	
	// Training
	//
	// The name passed to the trainMind method specifies which specific mind to train
	var trainingPatterns = [
	    {
	        input: [0, 0],
	        output: [0]
	    },
	    {
	        input: [0, 1],
	        output: [1]
	    },
	    {
	        input: [1, 0],
	        output: [1]
	    },
	    {
	        input: [1, 1],
	        output: [0]
	    }
	];
	cerebrum.trainMind(trainingPatterns, function(trainingStatus) {
	    console.log("Epoch: " + trainingStatus.elapsedEpochCounter);
	}, "firstNeuralNetwork");
	
	// Querying
	//
	// The name passed to the queryMind method specifies which specific mind to query
	var inputPatterns = [
	    [0, 0],
	    [0, 1],
	    [1, 0],
	    [1, 1]
	];
	cerebrum.queryMind(inputPatterns, function(queryingStatus) {
	    inputPatterns.forEach(function(inputPatten, inputPatternIndex) {
	        console.log("[" + inputPatterns[inputPatternIndex].join(", ") + "] => [" + queryingStatus.outputPatterns[inputPatternIndex].join(", ") + "]");
	    });
	}, "firstNeuralNetwork");

### Training/Querying an entire Networks architecture through the Host ###

	TODO

### Training/Querying an entire Networks architecture through the Host ###

	TODO

### Training/Querying a specific Network through the Bios ###

	TODO

### Training/Querying an entire Networks architecture through the Bios ###

	TODO

### Training/Querying an entire Networks architecture through the Bios ###

	TODO

# Creator #

[Antonio De Luca](http://www.antoniodeluca.info)

----------

# License #

MIT