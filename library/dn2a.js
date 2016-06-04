import {Brain} from "./brain";
import {Cerebrum} from "./cerebrum";

var DN2A = function() {
    this.cerebrum = new Cerebrum();
    this.brain = new Brain(this.cerebrum);
};

export {DN2A};
