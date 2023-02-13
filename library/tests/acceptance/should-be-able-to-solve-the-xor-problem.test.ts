import {
    CerebrumFactory,
    DefaultBrain,
    MathJSCalculator,
    NetworkAlphaFactory,
    NetworkAlphaNeuronFactory,
    NetworkAlphaSynapseFactory,
} from "@assets/index";

import { CerebrumConfiguration } from "@core/types";
import {
    QueryingInputPattern,
    QueryingOutputPattern,
    QueryingStatus,
} from "@core/types";

describe("When trained with training examples about the XOR problem", () => {
    it("Should be able to train up to a satisfying accuracy", () => {
        const mathJSCalculator = new MathJSCalculator();
        const cerebrumFactory = new CerebrumFactory(mathJSCalculator);
        const networkAlphaFactory = new NetworkAlphaFactory(mathJSCalculator);
        const networkAlphaNeuronFactory = new NetworkAlphaNeuronFactory(
            mathJSCalculator
        );
        const networkAlphaSynapseFactory = new NetworkAlphaSynapseFactory(
            mathJSCalculator
        );
        const brain = DefaultBrain.getInstance({
            cerebrum: {
                generator: cerebrumFactory,
                configuration: {
                    minds: [
                        {
                            name: "defaultMind",
                            network: {
                                generator: networkAlphaFactory,
                                configuration: {
                                    layerDimensions: [2, 4, 1],
                                    learningMode: "continuous",
                                    learningRate: 0.3,
                                    momentumRate: 0.7,
                                    maximumError: 0.005,
                                    maximumEpoch: 1000000,
                                    dataRepository: { neuronLayers: [] },
                                    neuron: {
                                        generator: networkAlphaNeuronFactory,
                                    },
                                    synapse: {
                                        generator: networkAlphaSynapseFactory,
                                    },
                                },
                            },
                            inputsFrom: ["cerebrum"],
                        },
                    ],
                    outputsFrom: ["defaultMind"],
                } as CerebrumConfiguration,
            },
        });
        const trainingPatterns = [
            {
                input: [0, 0],
                output: [0],
            },
            {
                input: [0, 1],
                output: [1],
            },
            {
                input: [1, 0],
                output: [1],
            },
            {
                input: [1, 1],
                output: [0],
            },
        ];
        const queryingPatterns = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ];
        const expectedQueryingResults = [
            {
                input: [0, 0],
                output: [expect.closeTo(0.05, 1)],
            },
            {
                input: [0, 1],
                output: [expect.closeTo(0.95, 1)],
            },
            {
                input: [1, 0],
                output: [expect.closeTo(0.95, 1)],
            },
            {
                input: [1, 1],
                output: [expect.closeTo(0.05, 1)],
            },
        ];

        brain.cerebrum.trainMind(trainingPatterns);
        const queryingResults = [] as {
            input: QueryingInputPattern;
            output: QueryingOutputPattern;
        }[];
        brain.cerebrum.queryMind(
            queryingPatterns,
            (queryingStatus: QueryingStatus) => {
                queryingPatterns.forEach(
                    (
                        queryingPattern: QueryingInputPattern,
                        queryingPatternIndex: number
                    ) => {
                        queryingResults.push({
                            input: queryingPattern,
                            output: queryingStatus.outputPatterns[
                                queryingPatternIndex
                            ],
                        });
                    }
                );
            },
            undefined,
            "defaultMind"
        );

        expect(queryingResults).toEqual(expectedQueryingResults);
    });
});
