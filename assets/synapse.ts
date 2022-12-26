import {create, all} from "mathjs";

const mathjs = create(all);

const Synapse = function(precisionConfiguration?) {
    precisionConfiguration = precisionConfiguration || {
        numbersPrecision: 64
    };
    const Synapse = function(configuration?) {
        this.configuration = configuration || {
            numbersPrecision: precisionConfiguration.numbersPrecision
        };

        if (!this.checkConfiguration()) {
            throw "Invalid Synapse Module Configuration";
        }
        this.configuration = this.transformConfiguration();

        mathjs.config({
            number: "BigNumber",
            // precision: this.configuration.numbersPrecision
        });

        this._incomingConnection = null;

        this._outgoingConnection = null;

        this._previousIncomingConnections = null;

        this._previousOutgoingConnections = null;

        this._previousWeight = mathjs.bignumber(0);

        this._previousWeightChange = mathjs.bignumber(0);

        this._weight = mathjs.subtract(
            mathjs.bignumber(1),
            mathjs.multiply(
                mathjs.bignumber(
                    mathjs.format(
                        mathjs.random(0, 1),
                        {
                            notation: "fixed",
                            precision: 15
                        }
                    )
                ),
                mathjs.bignumber(2)
            )
        );

        this._weightChange = mathjs.bignumber(0);
    };

    Synapse.prototype = {
        checkConfiguration: function() {
            return true;
        },
        transformConfiguration: function() {
            return this.configuration;
        },
        set incomingConnection(value) {
            this._incomingConnection = value;
        },
        get incomingConnection() {
            return this._incomingConnection;
        },
        set outgoingConnection(value) {
            this._outgoingConnection = value;
        },
        get outgoingConnection() {
            return this._outgoingConnection;
        },
        set previousIncomingConnection(value) {
            this._previousIncomingConnection = value;
        },
        get previousIncomingConnection() {
            return this._previousIncomingConnection;
        },
        set previousOutgoingConnection(value) {
            this._previousOutgoingConnection = value;
        },
        get previousOutgoingConnection() {
            return this._previousOutgoingConnection;
        },
        set previousWeight(value) {
            this._previousWeight = value;
        },
        get previousWeight() {
            return this._previousWeight;
        },
        set previousWeightChange(value) {
            this._previousWeightChange = value;
        },
        get previousWeightChange() {
            return this._previousWeightChange;
        },
        set weight(value) {
            this._weight = value;
        },
        get weight() {
            return this._weight;
        },
        set weightChange(value) {
            this._weightChange = value;
        },
        get weightChange() {
            return this._weightChange;
        }
    };
    return Synapse;
};

export default Synapse;
