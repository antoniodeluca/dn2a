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
                "jasmine",
                "jasmine-matchers"
            ],
            plugins: [
                "karma-browserify",
                "karma-jasmine",
                "karma-jasmine-matchers",
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
