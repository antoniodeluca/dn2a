import { NetworkAlpha } from "./NetworkAlpha"
import { NetworkAlphaConfiguration } from "./NetworkAlphaInterface"
 
class NetworkAlphaFactory {
    static getInstance(configuration?: NetworkAlphaConfiguration) {
        return new NetworkAlpha(configuration)
    }
}

export {
    NetworkAlphaFactory
}