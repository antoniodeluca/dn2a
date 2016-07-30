(function() {
    "use strict";
    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            babel: {
                options: {
                    sourceMap: false,
                    presets: ["es2015"]
                },
                dist: {
                    files: {
                        "built/networks/alpha.js": "library/networks/alpha.js",
                        "built/bios.js": "library/bios.js",
                        "built/brain.js": "library/brain.js",
                        "built/cerebrum.js": "library/cerebrum.js",
                        "built/dn2a.js": "library/dn2a.js",
                        "built/host.js": "library/host.js",
                        "built/link.js": "library/link.js",
                        "built/neuron.js": "library/neuron.js",
                        "built/node.js": "library/node.js",
                        "built/synapse.js": "library/synapse.js"
                    }
                }
            },
            browserify: {
                options: {
                    browserifyOptions: {
                        standalone: "DN2A"
                    }
                },
                dist: {
                    files: {
                        "bundled/dn2a.browser.js": ["built/dn2a.js"]
                    }
                }
            },
            clean: {
                builtFolder: {
                    src: ["built/**/*"]
                },
                bundledFolder: {
                    src: ["bundled/**/*"]
                }
            },
            jasmine_nodejs: {
                options: {
                    specNameSuffix: ".js", // also accepts an array
                    helperNameSuffix: "-helper.js",
                    useHelpers: false,
                    random: false,
                    seed: null,
                    defaultTimeout: null,
                    stopOnFailure: false,
                    traceFatal: true,
                    reporters: {
                        console: {
                            colors: true,
                            cleanStack: 1,
                            verbosity: 4,
                            listStyle: "indent",
                            activity: false
                        }
                    },
                    customReporters: []
                },
                tests: {
                    options: {
                        useHelpers: false
                    },
                    specs: [
                        "tests/**/*"
                    ],
                    helpers: []
                }
            },
            karma: {
                options: {
                    configFile: "karma.conf.js"
                },
                unitMode: {
                    singleRun: true
                },
                continuousMode: {
                    singleRun: false,
                    autoWatch: false
                }
            }
        });
        grunt.loadNpmTasks("grunt-babel");
        grunt.loadNpmTasks("grunt-browserify");
        grunt.loadNpmTasks("grunt-contrib-clean");
        grunt.loadNpmTasks("grunt-jasmine-nodejs");
        grunt.loadNpmTasks("grunt-karma");
        grunt.registerTask(
            "build",
            [
                "clean:builtFolder",
                "babel"
            ]
        );
        grunt.registerTask(
            "bundle",
            [
                "clean:builtFolder",
                "clean:bundledFolder",
                "babel",
                "browserify"
            ]
        );
        grunt.registerTask(
            "test",
            [
                "clean:builtFolder",
                "babel",
                "jasmine_nodejs",
                "karma:unitMode"
            ]
        );
    };
}());
