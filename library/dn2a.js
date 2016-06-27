import {Brain} from "./brain";
import {Cerebrum} from "./cerebrum";

var DN2A = function(configuration) {
    this.cerebrum = new Cerebrum(configuration.cerebrum);
    this.brain = new Brain(configuration.brain);
};

export {DN2A};
