import { Brain, Cerebrum, NetworkAlpha, Neuron, Synapse } from "../../../../assets/"

describe("When trained with training examples about the XOR problem", () => {
    it("Should be able to train up to a satisfying accuracy", () => {
        const brain = new (Brain as any)({
            cerebrum: {
                generator: Cerebrum,
                configuration: {
                    minds: [
                        {
                            name: "defaultMind",
                            network: {
                                generator: NetworkAlpha,
                                configuration: {
                                    layerDimensions: [2, 4, 1],
                                    learningMode: "continuous",
                                    learningRate: 0.3,
                                    momentumRate: 0.7,
                                    maximumError: 0.005,
                                    maximumEpoch: 1000,
                                    dataRepository: {},
                                    neuron: {
                                        generator: Neuron
                                    },
                                    synapse: {
                                        generator: Synapse
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
                        "defaultMind"
                    ]
                }
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
        const queryingPatterns = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ];
        const expectedQueryingResults = [
            {
                input: [0, 0],
                output: [expect.closeTo(0.05, 1)]
            },
            {
                input: [0, 1],
                output: [expect.closeTo(0.95, 1)]
            },
            {
                input: [1, 0],
                output: [expect.closeTo(0.95, 1)]
            },
            {
                input: [1, 1],
                output: [expect.closeTo(0.05, 1)]
            }
        ];

        brain.cerebrum.trainMind(trainingPatterns);
        let queryingResults = [] as any[]; 
        brain.cerebrum.queryMind(
            queryingPatterns,
            (queryingStatus: any) => {
                queryingPatterns.forEach(
                    (queryingPattern: any, queryingPatternIndex: any) => {
                        queryingResults.push({
                            input: queryingPattern,
                            output: queryingStatus.outputPatterns[queryingPatternIndex]
                        });
                    }
                );
            },
            null,
            "defaultMind"
        );

        expect(queryingResults).toEqual(expectedQueryingResults)
    })
})