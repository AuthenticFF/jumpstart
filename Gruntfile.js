// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  //
  // We use this to monitor when our processes are killed, so we can make sure we're halting vagrant
  //
  var ShutdownManager = require('node-shutdown-manager');
  var shutdownManager = ShutdownManager.createShutdownManager({
      timeout: 10000
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
      },
      scripts: {
        files: ['public/assets/scripts/**/*.js', '!public/assets/scripts/built/*'],
        tasks: ['browserify']
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
          proxy: {
            target: "localhost:8888",
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
    // Deployments
    //
    shipit: {

      options: {

        // Codebase details
        workspace: '.tmp',
        deployTo: '/var/www/jumpstart',
        repositoryUrl: 'git@codebasehq.com:thegoodlab/internal/project-jumpstart.git',
        branch: 'master',
        ignores: ['.git'],
        keepReleases: 2,
        key: '~/.ssh/id_rsa',
        shallowClone: true,

        // Shared directory details
        shared: {
          overwrite: true,
          dirs: ['public/uploads']
          // You can symlink files too
          // files: ['public/uploads']
        },

        // DB details
        db: {
          local: {
            host     : 'localhost:8888',
            // For servers using MySQL v 5.6_ we need to set the credentials inside the mysql_config_editor or else we get a warning
            // username: 'root',
            // passwprd" 'root',
            database : 'craft-template',
            adapter  : 'mysql',
          }
        },

        assets: {
          paths: ['public/uploads']
        }

      },

      // Staging Server
      staging: {

        // server address and credentials
        servers: ['root@198.58.109.239:24'],

        // Database connections
        db: {
          remote: {
            host     : '127.0.0.1',
            username : 'root',
            password : 'udh4756fhdknd8',
            database : 'jumpstart-test',
            adapter  : 'mysql',
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
      }
    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-shipit');
  grunt.loadNpmTasks('shipit-deploy');
  grunt.loadNpmTasks('shipit-shared');
  grunt.loadNpmTasks('shipit-db');
  grunt.loadNpmTasks('shipit-assets');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-chokidar');

  //
  // Halting vagrant when the watch process is killed
  //
  shutdownManager.addShutdownAction(function() {

    grunt.util.spawn({
      cmd: 'vagrant',
      args: ['halt']
    });

    grunt.log.writeln('\n' + "Halting Vagrant");

  });

  // Converting our project to a Craft project
  grunt.registerTask('converttocraft', ['shell:converttocraft']);

  // Compiling our Icons, Javascript, and SCSS
  grunt.registerTask('compile', ['grunticon','uglify','cssmin']);

  // Launching our Dev environment
  grunt.registerTask('dev', ['copy', 'grunticon', 'shell:vagrantup', 'browserify', 'browserSync', 'chokidar']);

};
