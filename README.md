# DN2A - Digital Neural Network Architecture #

> **IMPORTANT**: the system is under heavy development and only tagged versions (at moment not yet available) should be used for production. The package is however already stable and usable for all the various experiments.

----------

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
- TODO (Brain) **Data normalization**: helps to simplify the interaction within your real domain. 
- TODO (Cerebrum) **Networks composition**: helps to create very effective architectures of multiple neural networks able to obtain advanced behaviours like in deep learning.
- TODO (Cerebrum) **Computation parallelization**: helps to improve the scalability of your whole system.
- TODO (Brain) **Sessions intercommunication**: helps to improve the scalability of your whole system.

----------

## Modules ##

### Node (Neuron) ###
Module able to facilitate the representation of the data structure around Neurons and to hold relative common functionalities.

### Link (Synapse) ###
Module able to facilitate the representation of the data structure around Synapses and to hold relative common functionalities.

### Network (Neural Network or Cortical Column) ###
Module, available in different variations, able to use Neurons and Synapses to implement configurable and autonomous Neural Networks.

#### Available Network Types ####

1. **Alpha**: standard feed forward neural network with error back propagation controlled by layer dimensions, learning mode, learning rate, momentum rate, maximum allowed error and maximum number of epochs.

### Host (Cerebrum) ###
Module for the management of multiple Neural Networks in terms of intercommunication, chained training/querying and parallel computing through Web Workers.

### Bios (Brain) ###
Module for the normalization of data, interconnection with other external software, communication betweeen installations and monitoring of the whole architecture.

----------

## Tutorials ##

### Using in Node  ###

To install the library through NPM:

	npm install dn2a

or to clone directly from the GitHub repository:

	git clone https://github.com/harthur/brain.git

To import from the NPM library in ES5:

	var DN2A = require("dn2a");

or to import from the GitHub repository in ES5:

	var DN2A = require("[path-of-the-repository]/built/dn2a");

To import from the NPM library in ES6:

	import * as DN2A from ("dn2a");

or to import from the GitHub repository in ES6:

	import * as DN2A from ("[path-of-the-repository]/built/dn2a");

### Using in the Browser ###

To install the library through Bower:

	bower install dn2a

### Training an architecture for the XOR problem solution ###

	var DN2A = require("dn2a");
	var brain = new DN2A.Brain();

	brain.cerebrum.trainMind([
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
	]);

# Creator #

[Antonio De Luca](http://www.antoniodeluca.info)

----------

# License #

MIT