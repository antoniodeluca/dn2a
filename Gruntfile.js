(function() {
    "use strict";
    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            browserify: {
                options: {
                    browserifyOptions: {
                        standalone: "DN2A"
                    }
                },
                dist: {
                    files: {
                        "bundle/dn2a.browser.js": ["built/dn2a.js"]
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
