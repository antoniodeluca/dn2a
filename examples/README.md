# DN2A Examples #

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/antoniodeluca/dn2a-examples/main/LICENSE)

## About ##

Some examples about how to use the DN2A library.

## How to use the examples ##

**Install all dependencies** with

`npm install`

**or install all dependencies apart from DN2A library** with `npm install --legacy-peer-deps` so that an independent library version can be manually installed or linked from the local "library" on the repository root (which is useful for library development).

*Notes:*

- if not using NPM 7+ the DN2A library, which is a peer dependency, could need to be installed manually or linked in any case as some NPM versions (4/5/6) do not install peer dependencies by default.
- to link the local "library" folder execute `npm link` from there and then `npm link dn2a` from the "examples" folder.
- if working within an environment that is incompatible with `npm link` execute `npm run link` from the "examples" folder as an alternative.
- if using the linked local "library" folder, execute `npm install` from there and then also `npm run build:parcel` or `npm run build:webpack` (which is an alternative for those environments that are incompatible with Parcel).

**See the examples in action** executing from the "examples" folder one of the NPM scripts that begin with `start:`.

*Notes:*

- Node.js oriented examples, those starting with `start:cli:`, can be runned using commands like `npm run start:cli:alpha-continuous`.
- browser oriented ones, those starting with `start:browser:`, can be runned using commands like `npm run start:browser:alpha-continuous:parcel` or `npm run start:browser:alpha-continuous:vite` (which is an alternative for those environments that are incompatible with Parcel).