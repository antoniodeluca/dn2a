## To Do

- [ ] Add first spiking neural network
- [ ] Improve configuration via factories so that it is not compulsory to send all possible properties in the configuration object
- [ ] Alpha network should not be used by default because hardcoded in the general Cerebrum factory
  - [ ] Hardcoded usage of Alpha network should happen if using a specific bootstrapping factory built around it
- [ ] Add new networks as wrappers around third party open source neural networks libraries
  - [ ] Add specific bootstraping factories around the new networks as wrappers
- [ ] Implement reactive communication bus into the Cerebrum so that networks can interact with each other using messages each one reference with the name of the network that generated it
- [ ] Enable storing/loading of data and configurations for a single network
  - [ ] Enable storing/loading of data and configurations for all networks in a Cerebrum
  - [ ] Enable storing/loading of data and configurations for all networks in a Brain
- [ ] Add examples that support 3D visualization of the network as well as realtime plotting of select neurons/synapses behavior
  - [ ] Add examples that support 3D visualization all networks in a Cerebrum as well as realtime plotting of select neurons/synapses behavior
  - [ ] Add examples that support 3D visualization all networks in a Brain as well as realtime plotting of select neurons/synapses behavior
- [ ] Add support for streams and promises to training/querying methods as alternatives to the callbacks
- [ ] Allow use to easily access each single neuron/synapse state change of a network via a event listener approach
- [ ] Fix stepbystep, continuous and stopatgoal learning modes in the Alpha network
- [ ] Add CI/CD pipeline for PRs verification and NPM module publishing
- [ ] Refactor training/querying methods in the Alpha network to make them more understandable
- [ ] Complete removal of direct Math.js usage from the Alpha network code making the MathJS adapter responsible for all operations on the basis of a specific interface
- [ ] Improve network resolution mechanism to allow usage of external extensions which respect that same core/infrastructure organization
- [ ] Add examples for alternative contexts which go beyond the XOR
- [ ] Make each class supporting configuration responsible to validate the settings as well as to throw if needed
- [ ] Add networks that act as logical, persistence, communication and presentation modules to enable programmatic operations
- [ ] Support running each network in a separate web worker
- [ ] Add alternative neuron activation functions in the Alpha network
- [ ] Add alternative synapse update functions in the Alpha network
- [ ] Support networks as WASM modules
- [ ] Add start, pause and stop methods to the Alpha network as well as to the generic network interface
- [ ] Implement decay of synapses in the Alpha network
- [ ] Add example Docker configuration
- [ ] Add data conversion and normalization utilities
- [ ] Support parallelization via Brain sessions intercommunication via HTTP and WebSocket
- [ ] Support realtime parametrization of the Alpha network
- [ ] Add configurable network to execute custom code
- [ ] Support genetic tecniques for training in the Alpha network
  - [ ] Support genetic tecniques for training in the Cereburm
  - [ ] Support genetic tecniques for training in the Brain
- [ ] Support realtime automatic removal and addition of neurons in the Alpha network
- [ ] Add automatic network dimensions sizing on the basis of training patterns in the Alpha network

## In Progress

- [ ] /

## Done

- [x] Rename "mind" into "network" around the code
