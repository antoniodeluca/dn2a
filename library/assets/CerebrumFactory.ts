import { Cerebrum } from "./Cerebrum";
import { CerebrumConfiguration } from "./CerebrumInterface";

class CerebrumFactory {
    static getInstance(configuration?: CerebrumConfiguration) {
        return new Cerebrum(configuration);
    }
}

export { CerebrumFactory };
