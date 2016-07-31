(function() {
    "use strict";
    module.exports = function (config) {
        config.set({
            autoWatch: false,
            basePath: "./",
            browsers: [
                "PhantomJS"
            ],
            colors: true,
            files: [
                "tests/**/*.js"
            ],
            frameworks: [
                "browserify",
                "jasmine"
            ],
            plugins: [
                "karma-browserify",
                "karma-jasmine",
                "karma-phantomjs-launcher"
            ],
            preprocessors: {
                "tests/**/*.js": ["browserify"]
            },
            reporters: [
                "progress"
            ],
            singleRun: true
        });
    };
}());
