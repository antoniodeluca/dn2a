const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TypingsBundlerPlugin = require("typings-bundler-plugin");

const commonConfiguration = {
  entry: "./assets/index.ts",
  experiments: {
    outputModule: true
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "distributed")
  },
  plugins: [
    new TypingsBundlerPlugin({
      out: "types.d.ts"
    })
  ],
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  }
};

const configurationForBrowser = {
  ...commonConfiguration,
  output: {
    ...commonConfiguration.output,
    filename: "browser.js",
    library: {
      name: "DN2A",
      type: "window"
    }
  }
}

const configurationForCommonJS = {
  ...commonConfiguration,
  output: {
    ...commonConfiguration.output,
    filename: "index.js",
    libraryTarget: "commonjs"
  }
}

const configurationForES = {
  ...commonConfiguration,
  output: {
    ...commonConfiguration.output,
    filename: "module.js",
    libraryTarget: "module"
  }
}

module.exports = [configurationForBrowser, configurationForCommonJS, configurationForES];
