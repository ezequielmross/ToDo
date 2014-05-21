/*global module, grunt*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        copy: {
            libjs: {
                expand: true,
                cwd: 'bower_components/',
                src: ['angular/angular.js', 'angular-route/angular-route.js'],
                dest: 'www/lib/'
            },
            topcoat: {
                expand: true,
                cwd: 'bower_components/topcoat/',
                src: ['css/topcoat-mobile-dark.min.css', 'font/*.otf'],
                dest: 'www/lib/'
            },
            html: {
                expand: true,
                flatten: true,
                src: [ "src/*.html", "src/app/**/*.html"],
                dest: "www/"
            },
            css: {
                expand: true,
                cwd: 'src/',
                src: 'css/*.css',
                dest: 'www/'
            }
        },
        concat: {
            js: {
                src: ["src/app/app.js", "src/app/**/*.js"],
                dest: 'www/main.js'
            }
        }
    });
    //Plugins grunt
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    //Tarefas que podem executas
    
    grunt.registerTask('default', ['copy:libjs', 'copy:topcoat', 'copy:html', 'copy:css', 'concat:js']);
};