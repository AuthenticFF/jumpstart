// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    githooks: {
      all: {
        'pre-commit': [
          'uglify',
          'cssmin',
          'shell:addfiles'
        ]
      }
    },

    //
    // Style Tasks
    //

    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          'node_modules/foundation-sites/scss'
        ],
        outputStyle: 'nested'
      },
      dist: {
        files: {
          'public/assets/styles/css/raw-app.css': 'public/assets/styles/sass/app.scss'
        },
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files:{
          'public/assets/styles/css/app.css':'public/assets/styles/css/raw-app.css'
        }
      }
    },

    // Compressing CSS into minified file
    cssmin: {
      dist: {
        files: {
          "public/assets/styles/css/app.min.css": "public/assets/styles/css/app.css"
        }
      }
    },

    //
    // Javascript Tasks
    //

    // Compile javascript into a single file`
    browserify: {
      dist:{
        files:{
          "public/assets/scripts/built/scripts.js": "public/assets/scripts/main.js"
        },
        options: {
          watch : true,
          browserifyOptions : {
            debug : true
          }
        }
      }
    },

    // When we commit our code, compress it for production
    uglify: {
      dist:{
        files:{
          "public/assets/scripts/built/built.js": "public/assets/scripts/built/scripts.js"
        }
      }
    },



    //
    // Images and Icons
    //

    // compiling svg icons
    grunticon: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/assets/icons/original',
          src: ['*.svg', '*.png'],
          dest: "public/assets/icons/built"
        }],
        options: {
          enhanceSVG: true
        }
      }
    },


    //
    // Setting up our watch events
    //
    chokidar: {
      all: {
        files: ['app/**/*.html', 'app/**/*.twig'],
      },
      sass: {
        files: ['public/assets/styles/sass/**/*.scss'],
        tasks: [ 'sass', 'autoprefixer' ]
      }
    },


    //
    // Setting up Browser Sync
    //
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'public/assets/scripts/built/scripts.js',
            'public/assets/styles/css/app.css'
          ]
        },
        options: {
          watchTask: true,
          open:false,
          https: true,
          ghostMode: false,
          proxy: {
            target: "https://localhost:8890",
            reqHeaders: function(config){
              return {
                "host": "localhost:3000"
              }
            }
          }
        }
      }
    },

    //
    // Some shell commands we're using to help with Vagrant and converting things to Craft
    //
    shell: {
      options: {
        stdout: true
      },
      syncdown: {
        command: 'bash ./scripts/pull_db.sh && bash ./scripts/pull_assets.sh'
      },
      addfiles: {
        command: 'git add -f public/assets/scripts/built && git add -f public/assets/scripts/built'
      }
    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-chokidar');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-githooks');

  // Converting our project to a Craft project
  grunt.registerTask('converttocraft', ['shell:converttocraft']);

  // Compiling our Icons, Javascript, and SCSS
  grunt.registerTask('compile', ['grunticon','uglify','cssmin']);

  // Launching our Dev environment
  grunt.registerTask('dev', ['copy', 'grunticon', 'browserify', 'browserSync', 'chokidar']);

};
