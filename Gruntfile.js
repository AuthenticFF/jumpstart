module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // deployments: grunt.file.readJSON("config/settings/deployments.json"),

    // rsync: grunt.file.readJSON("config/settings/rsync.json"),

    clean: {
      hooks: ['.git/hooks/pre-commit']
    },

    shell: {
      hooks: {
        command: ['cp config/githooks/pre-commit .git/hooks/', 'chmod 755 .git/hooks/pre-commit'].join(";")
      }
    },

    copy: {
      plugins: {
        files: [
          // Foundation
          {cwd: "bower_components/foundation/scss/foundation", src: '**', dest: 'assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'foundation.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'normalize.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},
        ]
      }
    },

    bower_concat: {
      all: {
        dest: 'assets/scripts/built/bower.js',
        dependencies: {
          'foundation': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    concat: {
      dist: {
        src: [
          'assets/scripts/classes/*',
          'assets/scripts/templates/*',
          'assets/scripts/vendor/*',
          'assets/scripts/built/bower.js',
          'assets/scripts/main.js'
        ],
        dest: 'assets/scripts/built/scripts.js',
      },
    },

    uglify: {
      options: {
        mangle: false,
        compress: false,
        beautify: false
      },
      my_target: {
        files: {
          'assets/scripts/built/built.js': [
            'assets/scripts/built/scripts.js'
            ]
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'assets/styles/sass',
          cssDir: 'assets/styles/css',
          imagesDir: 'assets/images',
          javascriptsDir: 'assets/scripts',
          outputStyle: "nested",
          environment: "development",
          watch: true
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['assets/styles/sass/**/*.scss'],
        tasks: ['compass']
      },
      scripts: {
        files: ['assets/scripts/**/*.js', '!assets/scripts/built/*'],
        tasks: ['concat']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: ['compass', 'watch:scripts'],
    }

  });

  // TASKS

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks("grunt-rsync");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
  grunt.registerTask("init", ["copy:plugins"]);
  grunt.registerTask("compile", ["bower_concat", "concat", "uglify"]);
  grunt.registerTask("watchme", ["concurrent:watch"]);

  // grunt.registerTask("get-content", ["rsync:production"]);
  // grunt.registerTask('default', [""]);

};