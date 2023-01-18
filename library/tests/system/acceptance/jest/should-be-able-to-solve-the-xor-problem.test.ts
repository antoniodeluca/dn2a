import { Brain } from "../../../../assets"
import { CerebrumFactory } from "../../../../assets/CerebrumFactory";
import { CerebrumConfiguration } from "../../../../assets/CerebrumInterface";
import { NetworkAlphaFactory } from "../../../../assets/networks/alpha/NetworkAlphaFactory";
import { NeuronFactory } from "../../../../assets/networks/alpha/NeuronFactory";
import { SynapseFactory } from "../../../../assets/networks/alpha/SynapseFactory";
 
describe("When trained with training examples about the XOR problem", () => {
    it("Should be able to train up to a satisfying accuracy", () => {
        const brain = new Brain({
            cerebrum: {
                generator: CerebrumFactory.getInstance,
                configuration: {
                    minds: [
                        {
                            name: "defaultMind",
                            network: {
                                generator: NetworkAlphaFactory.getInstance,
                                configuration: {
                                    layerDimensions: [2, 4, 1],
                                    learningMode: "continuous",
                                    learningRate: 0.3,
                                    momentumRate: 0.7,
                                    maximumError: 0.005,
                                    maximumEpoch: 1000000,
                                    dataRepository: { neuronLayers: [] },
                                    neuron: {
                                        generator: NeuronFactory.getInstance
                                    },
                                    synapse: {
                                        generator: SynapseFactory.getInstance
                                    }
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
                } as CerebrumConfiguration
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
            undefined,
            "defaultMind"
        );

        expect(queryingResults).toEqual(expectedQueryingResults)
    })
})