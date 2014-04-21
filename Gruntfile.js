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
          {cwd: "bower_components/foundation/scss/foundation", src: '**', dest: 'httpdocs/assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'foundation.scss', dest: 'httpdocs/assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'normalize.scss', dest: 'httpdocs/assets/styles/sass/', expand: true, flatten: false},
        ]
      }
    },

    bower_concat: {
      all: {
        dest: 'httpdocs/assets/scripts/built/bower.js',
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
          'httpdocs/assets/scripts/built/bower.js',
          'httpdocs/assets/scripts/vendor/*',
          'httpdocs/assets/scripts/classes/*',
          'httpdocs/assets/scripts/templates/*',
          'httpdocs/assets/scripts/main.js'
        ],
        dest: 'httpdocs/assets/scripts/built/scripts.js',
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
          'httpdocs/assets/scripts/built/built.js': [
            'httpdocs/assets/scripts/built/scripts.js'
            ]
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'httpdocs/assets/styles/sass',
          cssDir: 'httpdocs/assets/styles/css',
          imagesDir: 'httpdocs/assets/images',
          javascriptsDir: 'httpdocs/assets/scripts',
          outputStyle: "nested",
          environment: "development"
        }
      }
    },

    watch: {
      all: {
        files: 'httpdocs/*.html',
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['httpdocs/assets/styles/sass/**/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['httpdocs/assets/scripts/**/*.js', '!httpdocs/assets/scripts/built/*'],
        tasks: ['concat'],
        options: {
          livereload: true
        }
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      }
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

  // grunt.registerTask("get-content", ["rsync:production"]);
  // grunt.registerTask('default', [""]);

};