import {Brain} from "./brain";
import {Cerebrum} from "./cerebrum";
import {NetworkAlpha} from "./networks/alpha";
import {Neuron} from "./neuron";
import {Synapse} from "./synapse";

let DN2A = {
    Brain : Brain,
    Cerebrum : Cerebrum,
    NetworkAlpha : NetworkAlpha,
    Neuron : Neuron,
    Synapse : Synapse
};

module.exports = DN2A;
