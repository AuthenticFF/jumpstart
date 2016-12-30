// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //
    // We're using a Git pre-commit hook to compile our code each time we make a Git commit.
    // this task moves the contents of the .pre-commit-sample file into the pre-commit file within
    // the .git directory
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
    watch: {
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
          proxy: "jumpstart.local"
        }
      }
    },


    //
    // Deployments
    //
    shipit: {

      options: {

        workspace: '.tmp',
        deployTo: '/var/www/jumpstart',
        repositoryUrl: 'git@codebasehq.com:thegoodlab/internal/project-jumpstart.git',
        branch: 'master',
        ignores: ['.git'],
        keepReleases: 2,
        key: '~/.ssh/id_rsa',
        shallowClone: true,

        shared: {
          overwrite: true,
          dirs: ['public/uploads']
          // You can symlink files too
          // files: ['public/uploads']
        }

      },

      staging: {
        servers: [
          'root@198.58.109.239:24'
        ]
      }

    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-shipit');
  grunt.loadNpmTasks('shipit-deploy');
  grunt.loadNpmTasks('shipit-shared');
  // grunt.registerTask('pwd', function () {
  //   grunt.shipit.remote('pwd', this.async());
  // });

  grunt.registerTask('dev', ['copy', 'grunticon', 'browserSync', 'watch']);

};
