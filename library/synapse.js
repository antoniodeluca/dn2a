import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

m.config({
    number: "BigNumber",
    precision: 64
});

let Synapse = function() {
    let incomingConnection = null;
    let outgoingConnection = null;
    let previousIncomingConnections = null;
    let previousOutgoingConnections = null;
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
        set weight(value) {
            weight = value;
        },
        get weight() {
            return weight;
        }
    };
};

export {Synapse};
