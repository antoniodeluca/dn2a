import { all, create } from "mathjs";

import { NeuronFactory } from "./NeuronFactory";
import { SynapseFactory } from "./SynapseFactory";
import {
    DataRepository,
    NetworkAlphaConfiguration,
    QueryingEpochCallback,
    QueryingIterationCallback,
    TrainingEpochCallback,
    TrainingIterationCallback,
} from "./NetworkAlphaInterface";
import { NeuronInterface } from "./NeuronInterface";
import { SynapseInterface } from "./SynapseInterface";
import {
    QueryingInputPatterns,
    TrainingPatterns,
} from "../../InputOutputInterface";
import { Calculator } from "../CalculatorInterface";

const mathjs = create(all);
mathjs.config({
    number: "number",
});

class NetworkAlpha {
    private configuration: NetworkAlphaConfiguration;

    private calculator: Calculator;

    private _dataRepository: DataRepository;

    private neuronGenerator: NeuronFactory;

    private synapseGenerator: SynapseFactory;

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
            const neuronScope =
                neuronLayers.length === 0
                    ? "input"
                    : neuronLayers.length <
                      this.configuration.layerDimensions.length - 1
                    ? "hidden"
                    : "output";
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
        const neuron = this.neuronGenerator.getInstance();
        const proxy = scope === "input" ? true : false;
        const fixed = scope === "bias" ? true : false;
        const output = fixed ? 1 : 0;
        neuron.proxy = proxy;
        neuron.fixed = fixed;
        neuron.output = output;
        return neuron;
    }

    private generateSynapses() {
        let previousLayerNeurons = [] as NeuronInterface[];
        this._dataRepository.neuronLayers.forEach(
            (neuronLayer: NeuronInterface[], neuronLayerIndex: number) => {
                const layerNeurons = neuronLayer;
                if (neuronLayerIndex > 0) {
                    layerNeurons.forEach((layerNeuron) => {
                        if (!layerNeuron.fixed) {
                            previousLayerNeurons.forEach(
                                (previousLayerNeuron) => {
                                    const synapse = this.generateSynapse();
                                    synapse.incomingConnection =
                                        previousLayerNeuron;
                                    synapse.outgoingConnection = layerNeuron;
                                    previousLayerNeuron.addOutgoingConnection(
                                        synapse
                                    );
                                    layerNeuron.addIncomingConnection(synapse);
                                }
                            );
                        }
                    });
                }
                previousLayerNeurons = layerNeurons;
            }
        );
    }

    private generateSynapse() {
        const synapse = this.synapseGenerator.getInstance();
        return synapse;
    }

    private setInputPattern(inputPattern: number[]) {
        this._dataRepository.neuronLayers[0].forEach(
            (layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
                if (!layerNeuron.fixed) {
                    layerNeuron.output = inputPattern[layerNeuronIndex];
                }
            }
        );
    }

    private getInputPattern() {
        const inputPattern = [] as number[];
        this._dataRepository.neuronLayers[0].forEach(
            (layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
                inputPattern[layerNeuronIndex] = layerNeuron.output;
            }
        );
        return inputPattern;
    }

    private setExpectedOutputPattern(expectedOutputPattern: number[]) {
        this._dataRepository.neuronLayers[
            this._dataRepository.neuronLayers.length - 1
        ].forEach((layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
            layerNeuron.expectedOutput =
                expectedOutputPattern[layerNeuronIndex];
        });
    }

    private getExpectedOutputPattern() {
        const expectedOutputPattern = [] as number[];
        this._dataRepository.neuronLayers[
            this._dataRepository.neuronLayers.length - 1
        ].forEach((layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
            expectedOutputPattern[layerNeuronIndex] =
                layerNeuron.expectedOutput;
        });
        return expectedOutputPattern;
    }

    private setOutputPattern(outputPattern: number[]) {
        this._dataRepository.neuronLayers[
            this._dataRepository.neuronLayers.length - 1
        ].forEach((layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
            layerNeuron.output = outputPattern[layerNeuronIndex];
        });
    }

    private getOutputPattern() {
        const outputPattern = [] as number[];
        this._dataRepository.neuronLayers[
            this._dataRepository.neuronLayers.length - 1
        ].forEach((layerNeuron: NeuronInterface, layerNeuronIndex: number) => {
            outputPattern[layerNeuronIndex] = layerNeuron.output;
        });
        return outputPattern;
    }

    private getOutputError() {
        const layerNeurons =
            this._dataRepository.neuronLayers[
                this._dataRepository.neuronLayers.length - 1
            ];
        const numberOfNeuronsInTheLayer = layerNeurons.length;
        const layerNeuronOutputErrors = layerNeurons.map(
            (layerNeuron: NeuronInterface) => layerNeuron.outputError
        );
        const outputError = this.calculator.evaluate(
            "sum(dotPow(layerNeuronOutputErrors, 2)) / numberOfNeuronsInTheLayer",
            { layerNeuronOutputErrors, numberOfNeuronsInTheLayer }
        );

        return outputError;
    }

    private calculateActivations() {
        this._dataRepository.neuronLayers.forEach(
            (neuronLayer: NeuronInterface[], neuronLayerIndex: number) => {
                const layerNeurons = neuronLayer;
                if (neuronLayerIndex > 0) {
                    layerNeurons.forEach((layerNeuron) => {
                        if (!layerNeuron.fixed) {
                            const layerNeuronIncomingConnectionOutputs: number[] =
                                [];
                            const layerNeuronIncomingConnectionWeights: number[] =
                                [];
                            layerNeuron.incomingConnections.map(
                                (synapse: SynapseInterface) => {
                                    layerNeuronIncomingConnectionOutputs.push(
                                        synapse.incomingConnection.output
                                    );
                                    layerNeuronIncomingConnectionWeights.push(
                                        synapse.weight
                                    );
                                }
                            );
                            layerNeuron.inputSum = this.calculator.evaluate(
                                "dot(layerNeuronIncomingConnectionOutputs, layerNeuronIncomingConnectionWeights)",
                                {
                                    layerNeuronIncomingConnectionOutputs,
                                    layerNeuronIncomingConnectionWeights,
                                }
                            );
                            layerNeuron.output = layerNeuron.transferFunction(
                                layerNeuron.inputSum
                            );
                            const { expectedOutput, output } = layerNeuron;
                            layerNeuron.outputError = this.calculator.evaluate(
                                "expectedOutput - output",
                                { expectedOutput, output }
                            );
                        }
                    });
                }
            }
        );
    }

    private calculateDeltas() {
        for (
            let neuronLayerIndex = this._dataRepository.neuronLayers.length - 1;
            neuronLayerIndex >= 0;
            neuronLayerIndex--
        ) {
            if (neuronLayerIndex > 0) {
                const layerNeurons =
                    this._dataRepository.neuronLayers[neuronLayerIndex];
                if (
                    neuronLayerIndex ===
                    this._dataRepository.neuronLayers.length - 1
                ) {
                    layerNeurons.forEach((layerNeuron) => {
                        layerNeuron.delta = mathjs
                            .chain(layerNeuron.outputError)
                            .multiply(layerNeuron.output)
                            .multiply(mathjs.subtract(1, layerNeuron.output))
                            .done();
                    });
                } else {
                    layerNeurons.forEach((layerNeuron) => {
                        if (!layerNeuron.fixed) {
                            layerNeuron.delta = mathjs
                                .chain(
                                    layerNeuron.outgoingConnections
                                        .map((synapse) => {
                                            return mathjs.multiply(
                                                synapse.weight,
                                                synapse.outgoingConnection.delta
                                            );
                                        })
                                        .reduce((accumulator, value) => {
                                            return mathjs.add(
                                                accumulator,
                                                value
                                            );
                                        }, 0)
                                )
                                .multiply(layerNeuron.output)
                                .multiply(
                                    mathjs.subtract(1, layerNeuron.output)
                                )
                                .done();
                        }
                    });
                }
            }
        }
    }

    private calculateWeights(learningRate: number, momentumRate: number) {
        this._dataRepository.neuronLayers.forEach(
            (neuronLayer, neuronLayerIndex) => {
                if (neuronLayerIndex > 0) {
                    const layerNeurons = neuronLayer;
                    layerNeurons.forEach((layerNeuron) => {
                        if (!layerNeuron.fixed) {
                            layerNeuron.incomingConnections.forEach(
                                (synapse) => {
                                    synapse.previousWeightChange =
                                        synapse.weightChange;
                                    synapse.weightChange = mathjs.add(
                                        mathjs.multiply(
                                            learningRate,
                                            mathjs.multiply(
                                                layerNeuron.delta,
                                                synapse.incomingConnection
                                                    .output
                                            )
                                        ),
                                        mathjs.multiply(
                                            momentumRate,
                                            synapse.previousWeightChange
                                        )
                                    );
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
            }
        );
    }

    constructor(
        calculator: Calculator,
        configuration: NetworkAlphaConfiguration
    ) {
        this.calculator = calculator;

        this.configuration = configuration;

        if (!this.checkConfiguration()) {
            throw "Invalid NetworkAlpha Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        this._dataRepository = this.configuration.dataRepository;

        this.neuronGenerator = this.configuration.neuron.generator;

        this.synapseGenerator = this.configuration.synapse.generator;

        this.generateNeurons();
        this.generateSynapses();
    }

    set dataRepository(value) {
        this._dataRepository = value;
    }

    get dataRepository() {
        return this._dataRepository;
    }

    public train(
        trainingPatterns: TrainingPatterns,
        epochCallback?: TrainingEpochCallback,
        iterationCallback?: TrainingIterationCallback
    ) {
        let trainingStatus = {
            outputErrors: [] as number[],
            interruptionRequest: false,
            elapsedEpochCounter: 0,
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [] as number[],
                target: [] as number[],
                output: [] as number[],
                error: 0,
            },
        };
        do {
            trainingStatus.outputErrors = [];
            trainingStatus.interruptionRequest = true;
            trainingStatus.elapsedIterationCounter = 0;
            trainingStatus = trainingPatterns.reduce(
                (trainingStatus, trainingPattern) => {
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
                    trainingStatus.interruptionRequest = Boolean(
                        trainingStatus.interruptionRequest &&
                            mathjs.smallerEq(
                                outputError,
                                this.configuration.maximumError
                            )
                    );
                    trainingStatus.elapsedIterationCounter++;
                    trainingStatus.elapsedIterationPattern.input =
                        trainingPattern.input;
                    trainingStatus.elapsedIterationPattern.target =
                        this.getExpectedOutputPattern();
                    trainingStatus.elapsedIterationPattern.output =
                        this.getOutputPattern();
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
        inputPatterns: QueryingInputPatterns,
        epochCallback?: QueryingEpochCallback,
        iterationCallback?: QueryingIterationCallback
    ) {
        const queryingStatus = {
            outputPatterns: [] as number[][],
            elapsedIterationCounter: 0,
            elapsedIterationPattern: {
                input: [] as number[],
                output: [] as number[],
            },
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

export { NetworkAlpha };
