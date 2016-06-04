(function() {
    "use strict";
    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            browserify: {
                dist: {
                    files: {
                        "bundle/dn2a.browser.min.js": ["built/**/*.js"]
                    }
                }
            }
        });
        grunt.loadNpmTasks("grunt-browserify");
        grunt.registerTask(
            "bundle",
            [
                "browserify"
            ]
        );
    };
}());
