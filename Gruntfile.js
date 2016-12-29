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
      main:{
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

    watch: {
      // all: {
      //   files: ['craft/**/*.php', 'public/content/**/*.txt'],
      //   options: {
      //     livereload: true
      //   }
      // },
      sass: {
        files: ['public/assets/styles/sass/**/*.scss'],
        tasks: [ 'sass' ]
      },
      scripts: {
        files: ['public/assets/scripts/**/*.js', '!public/assets/scripts/built/*'],
        tasks: ['browserify']
      }
    },

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
    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('dev', ['browserSync', 'watch']);

  // grunt.registerTask("compile", ["browserify", 'sass', "uglify", 'cssmin']);
  // grunt.registerTask("compile", ["browserify", 'sass', 'cssmin']);

};
