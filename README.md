# DN2A (JavaScript) #

## Digital Neural Networks Architecture ##

[![Build Status](https://travis-ci.org/antoniodeluca/dn2a.js.svg?branch=master)](https://travis-ci.org/antoniodeluca/dn2a.js)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/antoniodeluca/dn2a.js/master/LICENSE)
[![npm version](https://badge.fury.io/js/dn2a.svg)](https://badge.fury.io/js/dn2a)

---

## About ##

DN2A is a set of highly decoupled JavaScript modules for Neural Networks and Artificial Intelligence development.

Each module is based on injection by configuration.

You can use a single module alone, more of them together or just the complete set.

DN2A main goal is to allow you to design, train and use without pain Single Neural Networks as well as very powerful Neural Networks Chains through which implement your Artificial Intelligence solution.

DN2A side goals are to simplify integration, to speed up training/querying, to allow clustering and to represent the architecture and the relative data of each Neural Network as a (re)combinable string strain that will be usable within genetics optimization techniques.

----------

## Features ##

- **Modularized components**: helps the development and the clear separation of concerns with great benefits for who wants to use mixed solutions.
- **Configurable precision**: helps to avoid the noise deriving from operation errors and default system precision limits with great improvement of the learning speed and performance stability.
- **Configuration checker**: helps to write less details about configuration and to keep compatibility with older version while the project evolves.
- **StepByStep training**: helps to train neural networks doing a single iteration over the passed information.
- **StopAtGoal training**: helps to train neural networks doing a finite number of iterations over the passed information until a specific parametric condition is reached.
- **Continuous training**: helps to train neural networks doing an infinite number of iterations over the passed information.
- TODO (Brain) **Data normalization**: helps to simplify the interaction within your real domain.
- TODO (Cerebrum) **Networks composition**: helps to create very effective architectures of multiple neural networks able to obtain advanced behaviours like in deep learning.
- TODO (Cerebrum) **Computation parallelization**: helps to improve the scalability of your whole system.
- TODO (Brain) **Sessions intercommunication**: helps to improve the scalability of your whole system.

----------

## Modules ##

### Neuron ###
Module able to facilitate the representation of the data structure around Neurons and to hold relative common functionalities.

### Synapse ###
Module able to facilitate the representation of the data structure around Synapses and to hold relative common functionalities.

### Network ###
Module, available in different variations, able to use Neurons and Synapses to implement configurable and autonomous Neural Networks.

#### Available Network Types ####

1.  **alpha**: standard feed forward neural network with error back propagation controlled by layer dimensions, learning mode, learning rate, momentum rate, maximum allowed error and maximum number of epochs.

### Cerebrum ###
Module for the management of multiple Neural Networks in terms of configuration/coordination, training/querying chaining and parallel computing.

### Brain ###
Module for the management of data normalization, integration/intercommunication with other external software and monitoring of the whole session.

----------

## Tutorials ##

### Using in Node  ###

To install the library through NPM:

	npm install dn2a

### Using in the Browser ###

To install the library through Bower:

	bower install dn2a

### Training and Querying a Single Network with default parametrization (ES5) ###

```javascript
// Importation
var DN2A = require("dn2a");

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
```

### Training and Querying a Single Network with custom parametrization (ES5) ###

```javascript
// Importation
var DN2A = require("dn2a");

// Instantiation
// The object expected by the constructor can specify properties that describe the neural network.
// The list of the valid properties together their accepted ranges and default values is reported in this README file.
// The object can be completely omitted and in this case default values are used for all properties.
var neuralNetwork = new DN2A.NetworkAlpha();

var neuralNetwork = new DN2A.NetworkAlpha({
    layerDimensions: [2, 4, 4, 1],
    learningMode: "continuous",
    learningRate: 0.3,
    momentumRate: 0.7,
    maximumError: 0.005,
    maximumEpoch: 20000,
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
```

### Training and Querying a Single Network with evolution feedback (ES5) ###

```javascript
// Importation
var DN2A = require("dn2a");

// Instantiation
var neuralNetwork = new DN2A.NetworkAlpha();

// Training
// The object passed to the callback function contains information about the training process.
// The list of the valid properties together their accepted ranges and default values is reported in this README file.
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
```

### Training and Querying a Single Network through the Cerebrum (ES5) ###

```javascript
// Importation
var DN2A = require("dn2a");

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
// The name expected as third parameter by the trainMind method specifies which specific mind to train
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
// The name expected as third parameter by the queryMind method specifies which specific mind to query
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
```

### Training and Querying an entire Networks Chain  through the Cerebrum (ES5) ###

	TODO

### Training and Querying a Single Network through the Brain (ES5) ###

	TODO

### Training and Querying an entire Networks Chain through the Brain (ES5) ###

	TODO

# Creator #

[Antonio De Luca](http://www.antoniodeluca.info)

----------

# License #

MIT
