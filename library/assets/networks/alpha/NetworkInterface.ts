import { QueryingPatterns, TrainingPatterns } from "../../InputOutputInterface"
 
interface NetworkInterface {
    train: (trainingPatterns: TrainingPatterns, epochCallback?: Function, iterationCallback?: Function) => void;
    
    query: (queryingPatterns: QueryingPatterns, epochCallback?: Function, iterationCallback?: Function) => void;
}

export {
    NetworkInterface
}
