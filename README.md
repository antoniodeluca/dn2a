# DN2A #

## Digital Neural Networks Architecture ##

[![Build Status](https://travis-ci.org/antoniodeluca/dn2a.svg?branch=master)](https://travis-ci.org/antoniodeluca/dn2a)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/antoniodeluca/dn2a/main/LICENSE)
[![npm version](https://badge.fury.io/js/dn2a.svg)](https://badge.fury.io/js/dn2a)

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

### Installation  ###

To install the library through NPM:

	npm install dn2a

### Training and Querying a Single Network with default parametrization ###

```javascript
import { NetworkAlpha } from "dn2a";

const neuralNetwork = new NetworkAlpha();

const trainingPatterns = [
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

// Training
neuralNetwork.train(trainingPatterns);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

// Querying
neuralNetwork.query(inputPatterns, (queryingStatus) => {
    inputPatterns.forEach((inputPatten, inputPatternIndex) => {
        console.log(``[${inputPatterns[inputPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[inputPatternIndex].join (", ")}]``);
    });
});
```

### Training and Querying a Single Network with custom parametrization ###

```javascript
import { NetworkAlpha, NeuronFactory, SynapseFactory } from "dn2a";

const neuralNetwork = new NetworkAlpha({
    layerDimensions: [2, 4, 4, 1],
    learningMode: "continuous",
    learningRate: 0.3,
    momentumRate: 0.7,
    maximumError: 0.005,
    maximumEpoch: 20000,
    dataRepository: {},
    neuron: {
        generator: NeuronFactory.getInstance
    },
    synapse: {
        generator: SynapseFactory.getInstance
    },
    numbersPrecision: 64
});

const trainingPatterns = [
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

// Training
neuralNetwork.train(trainingPatterns);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

// Querying
neuralNetwork.query(queryingPatterns, (queryingStatus) => {
    inputPatterns.forEach((inputPatten, inputPatternIndex) => {
        console.log(``[${inputPatterns[inputPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[inputPatternIndex].join(", ")}]``);
    });
});
```

### Training and Querying a Single Network with evolution feedback ###

```javascript
import { NetworkAlpha } from "dn2a";

const neuralNetwork = new NetworkAlpha();

const trainingPatterns = [
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

// Training
neuralNetwork.train(
    trainingPatterns, 
    (trainingStatus) => {
        console.log("Epoch: " + trainingStatus.elapsedEpochCounter);
    }
);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

// Querying
neuralNetwork.query(
    queryingPatterns, 
    (queryingStatus) => {
        inputPatterns.forEach((inputPatten, inputPatternIndex) => {
            console.log(``[${inputPatterns[inputPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[inputPatternIndex].join(", ")}]``);
        });
    }
);
```

### Training and Querying a Single Network through the Cerebrum ###

```javascript
import { Cerebrum, CerebrumConfiguration, NetworkAlphaFactory, NeuronFactory, SynapseFactory } from "dn2a";

const neuralNetwork = new NetworkAlpha({
    minds: [
        {
            name: "firstNeuralNetwork",
            network: {
                generator: NetworkAlphaFactory.getInstance,
                configuration: {
                    layerDimensions: [2, 4, 1],
                    learningMode: "continuous",
                    learningRate: 0.3,
                    momentumRate: 0.7,
                    maximumError: 0.005,
                    maximumEpoch: 1000,
                    dataRepository: {},
                    neuron: {
                        generator: NeuronFactory.getInstance
                    },
                    synapse: {
                        generator: SynapseFactory.getInstance
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
        "firstNeuralNetwork"
    ]
});

const trainingPatterns = [
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

// Training
cerebrum.trainMind(
    trainingPatterns, 
    (trainingStatus) => {
        console.log(``Epoch: ${trainingStatus.elapsedEpochCounter}``);
    }, 
    "firstNeuralNetwork"
);

const queryingPatterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

// Querying
cerebrum.queryMind(
    queryingPatterns, 
    (queryingStatus) => {
        inputPatterns.forEach((inputPatten, inputPatternIndex) => {
            console.log(``[${inputPatterns[inputPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[inputPatternIndex].join(", ")}]``);
        });
    }, 
    "firstNeuralNetwork"
);
```

# Creator #

[Antonio De Luca](http://www.antoniodeluca.info)

----------

# License #

MIT
