import * as a from "async";
import * as _ from "lodash";
import * as m from "mathjs";

let Synapse = function() {
    let incomingConnection = null;
    let outgoingConnection = null;
    let previousIncomingConnections = null;
    let previousOutgoingConnections = null;
    let weight = 1 - (Math.random() * 2);
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
            weight: value;
        },
        get weight() {
            return weight;
        },
        variateWeight: function(value) {
            weight += value;
        }
    };
};

export {Synapse};
