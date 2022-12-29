interface TrainingPattern {
    input: number[],
    output: number[]
}
 
type TrainingPatterns = TrainingPattern[]

type QueryingPattern = number[]

type QueryingPatterns = QueryingPattern[]

export {
    TrainingPattern,
    TrainingPatterns,
    QueryingPattern,
    QueryingPatterns
}
