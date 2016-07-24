import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

let Synapse = function(tmpConfiguration) {
    let configuration = tmpConfiguration || {
        numbersPrecision: 32
    };
    m.config({
        number: "BigNumber",
        precision: configuration.numbersPrecision;
    });
    return function Synapse() {
        let incomingConnection = null;
        let outgoingConnection = null;
        let previousIncomingConnections = null;
        let previousOutgoingConnections = null;
        let previousWeight = m.bignumber(0);
        let previousWeightChange = m.bignumber(0);
        let weight = m.subtract(
            m.bignumber(1),
            m.multiply(
                m.bignumber(
                    m.format(
                        m.random(0, 1),
                        {
                            notation: "fixed",
                            precision: 15
                        }
                    )
                ),
                m.bignumber(2)
            )
        );
        let weightChange = m.bignumber(0);
        return {
            set incomingConnection(value) {
                incomingConnection = value;
            },
            get incomingConnection() {
                return incomingConnection;
            },
            set outgoingConnection(value) {
                outgoingConnection = value;
            },
            get outgoingConnection() {
                return outgoingConnection;
            },
            set previousIncomingConnection(value) {
                previousIncomingConnection = value;
            },
            get previousIncomingConnection() {
                return previousIncomingConnection;
            },
            set previousOutgoingConnection(value) {
                previousOutgoingConnection = value;
            },
            get previousOutgoingConnection() {
                return previousOutgoingConnection;
            },
            set previousWeight(value) {
                previousWeight = value;
            },
            get previousWeight() {
                return previousWeight;
            },
            set previousWeightChange(value) {
                previousWeightChange = value;
            },
            get previousWeightChange() {
                return previousWeightChange;
            },
            set weight(value) {
                weight = value;
            },
            get weight() {
                return weight;
            },
            set weightChange(value) {
                weightChange = value;
            },
            get weightChange() {
                return weightChange;
            }
        };
    };
};

export {Synapse};
