module.exports = function(config) {
    config.set({
        autoWatch: false,
        basePath: '',
        browsers: [
            'Firefox',
            'Chrome'
        ],
        colors: true,
        concurrency: Infinity,
        exclude: [],
        files: [
            {
                pattern: 'tests/**/*.js',
                watched: false
            }
        ],
        frameworks: [
            'mocha'
        ],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'tests/**/*.js': ['webpack']
        },
        reporters: ['mocha'],
        singleRun: true,
        webpack: {
            node: {
                fs: 'empty'
            }
        }
    })
};
