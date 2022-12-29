import {all, BigNumber, create} from "mathjs";
 
import { NeuronFactory } from "./NeuronFactory";
import { SynapseFactory } from "./SynapseFactory";
import { DataRepository, NetworkAlphaConfiguration } from "./NetworkAlphaInterface";
import { NeuronConfiguration, NeuronInterface } from "./NeuronInterface";
import { SynapseConfiguration, SynapseInterface } from "./SynapseInterface";
import { QueryingPatterns, TrainingPatterns } from "../../InputOutputInterface";

const mathjs = create(all);

class NetworkAlpha {
    private defaultConfiguration = {
        layerDimensions: [2, 4, 1],
        learningMode: "continuous",
        learningRate: 0.3,
        momentumRate: 0.7,
        maximumError: 0.005,
        maximumEpoch: 1000,
        dataRepository: { neuronLayers: [] } as DataRepository,
        neuron: {
            generator: NeuronFactory.getInstance
        },
        synapse: {
            generator: SynapseFactory.getInstance
        },
        numbersPrecision: 64
    } as NetworkAlphaConfiguration;

    private configuration: NetworkAlphaConfiguration;

    private _dataRepository: DataRepository;

    private neuronGenerator: (configuration?: NeuronConfiguration) => NeuronInterface;

    private synapseGenerator: (configuration?: SynapseConfiguration) => SynapseInterface;

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }

    private generateNeurons() {
        const neuronLayers = [] as NeuronInterface[][];
        this.configuration.layerDimensions.forEach((layerDimension) => {
            const layerNeurons = [] as NeuronInterface[];
            const neuronScope = neuronLayers.length === 0 ? "input" : neuronLayers.length < (this.configuration.layerDimensions.length - 1) ? "hidden" : "output";
            [...Array(layerDimension)].forEach(() => {
                layerNeurons.push(this.generateNeuron(neuronScope));
            });
            if (neuronScope === "input" || neuronScope === "hidden") {
                layerNeurons.push(this.generateNeuron("bias"));
            }
            neuronLayers.push(layerNeurons);
        });
        this._dataRepository.neuronLayers = neuronLayers;
    }

    private generateNeuron(scope: string) {
        const neuron = this.neuronGenerator();
        const proxy = scope === "input" ? true : false;
        const fixed = scope === "bias" ? true : false;
        const output = mathjs.bignumber(fixed ? 1 : 0);
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
    }

    private generateSynapses() {
        let previousLayerNeurons = [] as NeuronInterface[];
        this._dataRepository.neuronLayers.forEach((
            neuronLayer: NeuronInterface[],
            neuronLayerIndex: number
        ) => {
            const layerNeurons = neuronLayer;
            if (neuronLayerIndex > 0) {
                layerNeurons.forEach((
                    layerNeuron
                ) => {
                    if (!layerNeuron.fixed) {
                        previousLayerNeurons.forEach((
                            previousLayerNeuron
                        ) => {
                            const synapse = this.generateSynapse();
                            synapse.incomingConnection = previousLayerNeuron;
                            synapse.outgoingConnection = layerNeuron;
                            previousLayerNeuron.addOutgoingConnection(synapse);
                            layerNeuron.addIncomingConnection(synapse);
                        });
                    }
                });
            }
            previousLayerNeurons = layerNeurons;
        });
    }

    private generateSynapse() {
        const synapse = this.synapseGenerator();
        return synapse;
    }

    private setInputPattern(inputPattern: number[]) {
        this._dataRepository.neuronLayers[0].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            if (!layerNeuron.fixed) {
                layerNeuron.output = mathjs.bignumber(inputPattern[layerNeuronIndex]);
            }
        });
    }

    private getInputPattern() {
        const inputPattern = [] as number[];
        this._dataRepository.neuronLayers[0].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            inputPattern[layerNeuronIndex] = mathjs.number(layerNeuron.output);
        });
        return inputPattern;
    }

    private setExpectedOutputPattern(expectedOutputPattern: number[]) {
        this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            layerNeuron.expectedOutput = mathjs.bignumber(expectedOutputPattern[layerNeuronIndex]);
        });
    }

    private getExpectedOutputPattern() {
        const expectedOutputPattern = [] as number[];
        this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            expectedOutputPattern[layerNeuronIndex] = mathjs.number(layerNeuron.expectedOutput);
        });
        return expectedOutputPattern;
    }

    private setOutputPattern(outputPattern: number[]) {
        this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            layerNeuron.output = mathjs.bignumber(outputPattern[layerNeuronIndex]);
        });
    }

    private getOutputPattern() {
        const outputPattern = [] as number[];
        this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].forEach((
            layerNeuron: NeuronInterface,
            layerNeuronIndex: number
        ) => {
            outputPattern[layerNeuronIndex] = mathjs.number(layerNeuron.output);
        });
        return outputPattern;
    }

    private getOutputError() {
        const outputError =
            mathjs.bignumber(mathjs.divide(
                this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].reduce(
                    (
                        totalOutputError: BigNumber, 
                        layerNeuron: NeuronInterface
                    ) => {
                        return mathjs.add(
                            totalOutputError,
                            mathjs.square(layerNeuron.outputError)
                        );
                    },
                    mathjs.bignumber(0)
                ),
                this._dataRepository.neuronLayers[this._dataRepository.neuronLayers.length - 1].length
            ).toString());
        return outputError;
    }

    private calculateActivations() {
        this._dataRepository.neuronLayers.forEach((
            neuronLayer: NeuronInterface[],
            neuronLayerIndex: number
        ) => {
            const layerNeurons = neuronLayer;
            if (neuronLayerIndex > 0) {
                layerNeurons.forEach((
                    layerNeuron
                ) => {
                    if (!layerNeuron.fixed) {
                        layerNeuron.incomingConnections.forEach(
                            (
                                synapse
                            ) => {
                                layerNeuron.inputSum = mathjs.bignumber(mathjs.add(
                                    layerNeuron.inputSum,
                                    mathjs.multiply(
                                        synapse.incomingConnection.output,
                                        synapse.weight
                                    )
                                ).toString());
                            }
                        );
                        layerNeuron.output = layerNeuron.transferFunction(layerNeuron.inputSum);
                        layerNeuron.outputError = mathjs.subtract(
                            layerNeuron.expectedOutput,
                            layerNeuron.output
                        );
                        layerNeuron.inputSum = mathjs.bignumber(0);
                    }
                });
            }
        });
    }

    private calculateDeltas() {
        for (
            let neuronLayerIndex = this._dataRepository.neuronLayers.length - 1; 
            neuronLayerIndex >= 0;
            neuronLayerIndex--
        ) {
            if (neuronLayerIndex > 0) {
                const layerNeurons = this._dataRepository.neuronLayers[neuronLayerIndex];
                if (neuronLayerIndex === (this._dataRepository.neuronLayers.length - 1)) {
                    layerNeurons.forEach((
                        layerNeuron
                    ) => {
                        layerNeuron.delta = mathjs.bignumber(mathjs.chain(
                            layerNeuron.outputError
                        ).multiply(
                            layerNeuron.output
                        ).multiply(
                            mathjs.subtract(
                                mathjs.bignumber(1),
                                layerNeuron.output
                            )
                        ).done().toString());
                    });
                } else {
                    layerNeurons.forEach((
                        layerNeuron
                    ) => {
                        if (!layerNeuron.fixed) {
                            layerNeuron.delta = mathjs.bignumber(mathjs.chain(
                                layerNeuron.outgoingConnections.map(
                                    (synapse) => {
                                        return mathjs.multiply(
                                            synapse.weight,
                                            synapse.outgoingConnection.delta
                                        );
                                    }
                                ).reduce(
                                    (accumulator, value) => {
                                        return mathjs.add(
                                            accumulator,
                                            value
                                        );
                                    },
                                    mathjs.bignumber(0)
                                )
                            ).multiply(
                                layerNeuron.output
                            ).multiply(
                                mathjs.subtract(
                                    mathjs.bignumber(1),
                                    layerNeuron.output
                                )
                            ).done().toString());
                        }
                    });
                }
            }
        }
    }

    private calculateWeights(learningRate, momentumRate) {
        this._dataRepository.neuronLayers.forEach((
            neuronLayer,
            neuronLayerIndex
        ) => {
            if (neuronLayerIndex > 0) {
                const layerNeurons = neuronLayer;
                layerNeurons.forEach((
                    layerNeuron
                ) => {
                    if (!layerNeuron.fixed) {
                        layerNeuron.incomingConnections.forEach(
                            (
                                synapse
                            ) => {
                                synapse.previousWeightChange = synapse.weightChange;
                                synapse.weightChange = mathjs.bignumber(mathjs.add(
                                    mathjs.multiply(
                                        mathjs.bignumber(learningRate),
                                        mathjs.multiply(
                                            layerNeuron.delta,
                                            synapse.incomingConnection.output
                                        )
                                    ),
                                    mathjs.multiply(
                                        mathjs.bignumber(momentumRate),
                                        synapse.previousWeightChange
                                    )
                                ).toString());
                                synapse.previousWeight = synapse.weight;
                                synapse.weight = mathjs.add(
                                    synapse.weight,
                                    synapse.weightChange
                                );
                            }
                        );
                    }
                });
            }
        });
    }

    constructor(configuration?: NetworkAlphaConfiguration) {
        this.configuration = configuration ? configuration : this.defaultConfiguration;

        if (!this.checkConfiguration()) {
            throw "Invalid NetworkAlpha Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        this._dataRepository = this.configuration.dataRepository;

        this.neuronGenerator = this.configuration.neuron.generator;

        this.synapseGenerator = this.configuration.synapse.generator;

        mathjs.config({
            number: "BigNumber",
        });

        this.generateNeurons();
        this.generateSynapses();
    };

    set dataRepository(value) {
        this._dataRepository = value;
    }

    get dataRepository() {
        return this._dataRepository;
    }

    public train(
        trainingPatterns: TrainingPatterns,
        epochCallback?: Function,
        iterationCallback?: Function
    ) {
        let trainingStatus = {
            outputErrors: [] as BigNumber[],
            interruptionRequest: false,
            elapsedEpochCounter: 0,
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [] as number[],
                target: [] as number[],
                output: [] as number[],
                error: mathjs.bignumber(0)
            }
        };
        do {
            trainingStatus.outputErrors = [];
            trainingStatus.interruptionRequest = true;
            trainingStatus.elapsedIterationCounter = 0;
            trainingStatus = trainingPatterns.reduce(
                (
                    trainingStatus,
                    trainingPattern
                ) => {
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
                    trainingStatus.interruptionRequest = Boolean(trainingStatus.interruptionRequest && mathjs.smallerEq(outputError, mathjs.bignumber(this.configuration.maximumError)));
                    trainingStatus.elapsedIterationCounter++;
                    trainingStatus.elapsedIterationPattern.input = trainingPattern.input;
                    trainingStatus.elapsedIterationPattern.target = this.getExpectedOutputPattern();
                    trainingStatus.elapsedIterationPattern.output = this.getOutputPattern();
                    trainingStatus.elapsedIterationPattern.error = outputError;
                    if (iterationCallback) {
                        iterationCallback(trainingStatus);
                    }
                    return trainingStatus;
                },
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
    }

    public query(
        inputPatterns: QueryingPatterns,
        epochCallback?: Function,
        iterationCallback?: Function
    ) {
        const queryingStatus = {
            outputPatterns: [] as number[][],
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [] as number[],
                output: [] as number[]
            }
        };
        inputPatterns.forEach((inputPattern) => {
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
        });
        if (epochCallback) {
            epochCallback(queryingStatus);
        }
    }
}

export { 
    NetworkAlpha
}
