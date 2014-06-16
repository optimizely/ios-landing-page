/*
 * Generated on 2014-04-11
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist',
      temp: 'temp',
      dev: {
        options: {
          variables: {
            'assetspath': '/img',
            'assetsfilepath': ''
          }
        }
      },
      prod: {
        options: {
          variables: {
            'assetspath': '/static/mobile/img',
            'assetsfilepath': '/static/mobile'
          }
        }
      }
    },
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['config:dev', 'assemble', 'copy:index', 'clean:after']
      },
      sass: {
        files: ['<%= config.src %>/css/*.scss'],
        tasks: ['config:dev', 'copy:css', 'copy:maincss', 'sass', 'autoprefixer', 'clean:after']
      },
      copy: {
        files: ['<%= config.src %>/img/*.{svg,png,jpg}'],
        tasks: ['copy:images', 'copy:js', 'clean:after']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/css/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },
    sass: {
      compileCSS: {
        files: {
          '<%= config.dist %>/css/styles.css': '<%= config.temp %>/css/styles.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      files: {
        src: '<%= config.dist %>/css/styles.css',
        dest: '<%= config.dist %>/css/styles.css'
      }
    },
    assemble: {
      pages: {
        options: {
          flatten: true,
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },
    copy: {
      css: {
        files: [
          {
            cwd: '<%= config.src %>/css/',
            src: ['**', '!main.scss'],
            dest: '<%= config.temp %>/css/',
            expand: true
          }
        ]
      },
      maincss: {
        src: '<%= config.src %>/css/main.scss',
        dest: '<%= config.temp %>/css/main.scss',
        options: {
          process: function (content, srcpath) {
            return content.replace(/@@assetspath/g, grunt.config.get("assetspath") );
          }
        }
      },
      index: {
        src: '<%= config.dist %>/index.html',
        dest: '<%= config.dist %>/index.html',
        options: {
          process: function (content, srcpath) {
            return content.replace(/@@assetsfilepath/g, grunt.config.get("assetsfilepath") );
          }
        }
      },
      images: {
        files: [
          {expand: true, flatten: true, src: '<%= config.src %>/img/*.{svg,png,jpg}', dest: '<%= config.dist %>/img/'}
        ]
      },
      js: {
        files: [
          {expand: true, flatten: true, src: '<%= config.src %>/js/*.js', dest: '<%= config.dist %>/js/'}
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      before: '<%= config.dist %>',
      after: '<%= config.temp %>'
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-config');

  grunt.registerTask('server', [
    'config:dev',
    'clean:before',
    'copy:css',
    'copy:maincss',
    'copy:images',
    'copy:js',
    'sass',
    'autoprefixer',
    'assemble',
    'copy:index',
    'clean:after',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'config:prod',
    'clean',
    'copy:css',
    'copy:maincss',
    'copy:images',
    'copy:js',
    'sass',
    'autoprefixer',
    'assemble',
    'copy:index',
    'clean:after'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
