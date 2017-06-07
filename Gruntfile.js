// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  //
  // We use this to monitor when our processes are killed, so we can make sure we're halting vagrant
  //
  var ShutdownManager = require('node-shutdown-manager');
  var shutdownManager = ShutdownManager.createShutdownManager({
    timeout: 1000
  });

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //
    // We're using a Git pre-commit hook to compile our code each time we make a Git commit.
    // this task moves the contents of the .pre-commit-sample file into the pre-commit file within
    // the .git directory
    //
    // This technically only needs to be done once, but we have it triggered each time the dev task starts
    // to ensure it's not forgotten
    //
    copy: {
      dist:{
        files: [
          {src: '.pre-commit-sample', dest: '.git/hooks/pre-commit'},
        ]
      }
    },

    //
    // Style Tasks
    //

    // Compiling our SCSS into CSS
    //
    // Note: our Bourbon and Foundation packages are being included
    //
    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          require('node-bourbon').includePaths,
          'node_modules/foundation-sites/scss'
        ],
        outputStyle: 'nested'
      },
      dist: {
        files: {
          'public/assets/styles/css/app.css': 'public/assets/styles/sass/app.scss'
        },
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
        tasks: [ 'sass' ]
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
      vagrantup: {
        command: 'vagrant up'
      },
      converttocraft: {
        command: 'bash ./server/provision-craft.sh'
      },
      syncdown: {
        command: 'bash ./scripts/pull_db.sh && bash ./scripts/pull_assets.sh'
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

  //
  // Halting vagrant when the watch process is killed
  //
  shutdownManager.on('preShutdown', function( reason, err) {

    if(reason === "SIGINT"){
      grunt.util.spawn({
        cmd: 'vagrant',
        args: ['halt']
      });

      grunt.log.writeln('\n' + "Halting Vagrant");
    }

  });

  // Converting our project to a Craft project
  grunt.registerTask('converttocraft', ['shell:converttocraft']);

  // Compiling our Icons, Javascript, and SCSS
  grunt.registerTask('compile', ['grunticon','uglify','cssmin']);

  // Launching our Dev environment
  grunt.registerTask('dev', ['copy', 'grunticon', 'shell:vagrantup', 'browserify', 'browserSync', 'chokidar']);

};
