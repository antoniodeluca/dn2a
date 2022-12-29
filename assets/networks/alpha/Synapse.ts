import {all, create} from "mathjs";
 
import { SynapseConfiguration, SynapseInterface } from "./SynapseInterface";

const mathjs = create(all);

class Synapse implements SynapseInterface {
    private defaultConfiguration = {
        numbersPrecision: 64
    } as SynapseConfiguration;

    private configuration: SynapseConfiguration;

    private _incomingConnection;

    private _outgoingConnection;

    private _previousIncomingConnection;

    private _previousOutgoingConnection;

    private _previousWeight = mathjs.bignumber(0);

    private _previousWeightChange = mathjs.bignumber(0);

    private _weight = mathjs.bignumber(mathjs.subtract(
        mathjs.bignumber(1),
        mathjs.multiply(
            mathjs.bignumber(
                mathjs.random(0, 1)
            ),
            mathjs.bignumber(2)
        )
    ).toString());

    private _weightChange = mathjs.bignumber(0);

    private checkConfiguration() {
        return true;
    }

    private transformConfiguration() {
        return this.configuration;
    }
    
    constructor(configuration?) {
        this.configuration = configuration ? configuration : this.defaultConfiguration;

        if (!this.checkConfiguration()) {
            throw "Invalid Synapse Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        mathjs.config({
            number: "BigNumber",
        });
    };

    set incomingConnection(value) {
        this._incomingConnection = value;
    }

    get incomingConnection() {
        return this._incomingConnection;
    }

    set outgoingConnection(value) {
        this._outgoingConnection = value;
    }

    get outgoingConnection() {
        return this._outgoingConnection;
    }

    set previousIncomingConnection(value) {
        this._previousIncomingConnection = value;
    }

    get previousIncomingConnection() {
        return this._previousIncomingConnection;
    }

    set previousOutgoingConnection(value) {
        this._previousOutgoingConnection = value;
    }

    get previousOutgoingConnection() {
        return this._previousOutgoingConnection;
    }

    set previousWeight(value) {
        this._previousWeight = value;
    }

    get previousWeight() {
        return this._previousWeight;
    }

    set previousWeightChange(value) {
        this._previousWeightChange = value;
    }

    get previousWeightChange() {
        return this._previousWeightChange;
    }

    set weight(value) {
        this._weight = value;
    }

    get weight() {
        return this._weight;
    }

    set weightChange(value) {
        this._weightChange = value;
    }

    get weightChange() {
        return this._weightChange;
    }
}

export {
    Synapse
}
