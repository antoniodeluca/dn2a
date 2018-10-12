module.exports = function(config) {
    config.set({
        autoWatch: true,
        basePath: '',
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        browsers: [
            'Firefox', 
            'Chrome'
        ],
        colors: true,
        concurrency: Infinity,
        exclude: [],
        files: ['tests/**/*.js'],
        frameworks: [
            'browserify',
            'mocha'
        ],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'tests/**/*.js': ['browserify']
        },
        reporters: ['mocha'],
        singleRun: true
    })
};
