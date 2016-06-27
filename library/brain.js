import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 64
});

import {Cerebrum} from "./cerebrum";

var Brain = function(configuration) {
    this.configuration = configuration || {};
};

export {Brain};
