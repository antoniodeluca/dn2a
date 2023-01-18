# DN2A Library #

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/antoniodeluca/dn2a/main/LICENSE)

## About ##

A set of JavaScript modules around neural network architectures.

The main goal is about easily design, train and query a single neural network as well as a graph of many.

The side goals are to simplify integration, to speed up training/querying, to allow clustering and to support genetics optimization techniques.

## Installation ##

To install the library through NPM:

`npm install dn2a`

## Modules ##

----------

### Network ###

Module, available in different variations, able to use neurons and synapses to implement configurable and autonomous Neural Networks.

#### Available Network Types ####

1. **alpha**: standard feed forward neural network with error back propagation controlled by layer dimensions, learning mode, learning rate, momentum rate, maximum allowed error and maximum number of epochs.

----------

### Cerebrum ###

Module for the management of multiple Neural Networks in terms of configuration/coordination, training/querying chaining and parallel computing.

### Brain ###

Module for the management of data normalization, integration/intercommunication with other external software and monitoring of the whole session.

## Examples ##

### Training and Querying a Single Alpha Network with default parametrization ###

    ```typescript
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
    neuralNetwork.query(queryingPatterns, (queryingStatus: any) => {
        queryingPatterns.forEach((queryingPattern, queryingPatternIndex) => {
            console.log(`[${queryingPatterns[queryingPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[queryingPatternIndex].join (", ")}]`);
        });
    });
    ```

### Training and Querying a Single Alpha Network with custom parametrization ###

    ```typescript
    import { NetworkAlpha, NetworkAlphaNeuronFactory, NetworkAlphaSynapseFactory } from "dn2a";

    const neuralNetwork = new NetworkAlpha({
        layerDimensions: [2, 4, 4, 1],
        learningMode: "continuous",
        learningRate: 0.3,
        momentumRate: 0.7,
        maximumError: 0.005,
        maximumEpoch: 20000,
        dataRepository: { neuronLayers: [] },
        neuron: {
            generator: NetworkAlphaNeuronFactory.getInstance
        },
        synapse: {
            generator: NetworkAlphaSynapseFactory.getInstance
        }
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
    neuralNetwork.query(queryingPatterns, (queryingStatus: any) => {
        queryingPatterns.forEach((queryingPattern, queryingPatternIndex) => {
            console.log(`[${queryingPatterns[queryingPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[queryingPatternIndex].join(", ")}]`);
        });
    });
    ```

### Training and Querying a Single Alpha Network with evolution feedback ###

    ```typescript
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
        (trainingStatus: any) => {
            console.log(`Epoch: ${trainingStatus.elapsedEpochCounter}`);
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
        (queryingStatus: any) => {
            queryingPatterns.forEach((queryingPattern, queryingPatternIndex) => {
                console.log(`[${queryingPatterns[queryingPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[queryingPatternIndex].join(", ")}]`);
            });
        }
    );
    ```

### Training and Querying a Single Alpha Network through the Cerebrum ###

    ```typescript
    import { Cerebrum, CerebrumConfiguration, NetworkAlphaFactory, NetworkAlphaNeuronFactory, NetworkAlphaSynapseFactory } from "dn2a";

    const cerebrum = new Cerebrum({
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
                            generator: NetworkAlphaNeuronFactory.getInstance
                        },
                        synapse: {
                            generator: NetworkAlphaSynapseFactory.getInstance
                        }
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
    } as CerebrumConfiguration);

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
        (trainingStatus: any) => {
            console.log(`Epoch: ${trainingStatus.elapsedEpochCounter}`);
        }, 
        (trainingStatus: any) => {
            console.log(`Iteration: ${trainingStatus.elapsedIterationCounter}`);
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
        (queryingStatus: any) => {
            queryingPatterns.forEach((queryingPattern, queryingPatternIndex) => {
                console.log(`[${queryingPatterns[queryingPatternIndex].join(", ")}] => [${queryingStatus.outputPatterns[queryingPatternIndex].join(", ")}]`);
            });
        }, 
        (queryingStatus: any) => {
            console.log(`Iteration: ${queryingStatus.elapsedIterationCounter}`);
        }, 
        "firstNeuralNetwork"
    );
    ```

## Creator ##

[Antonio De Luca](http://www.antoniodeluca.info)

----------

## License ##

MIT
