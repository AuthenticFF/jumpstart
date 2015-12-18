module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
  var compass = require('compass-importer')
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
          {cwd: "node_modules/foundation-sites/scss/foundation", src: '**', dest: 'public/assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "node_modules/foundation-sites/foundation/scss", src: 'foundation.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "node_modules/foundation-sites/foundation/scss", src: 'normalize.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},
        ]
      }
    },

    concat: {
      dist: {
        src: [
          'public/assets/scripts/built/bower.js',
          'public/assets/scripts/vendor/*',
          'public/assets/scripts/classes/*',
          'public/assets/scripts/templates/*',
          'public/assets/scripts/main.js'
        ],
        dest: 'public/assets/scripts/built/scripts.js',
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
          'public/assets/scripts/built/built.js': [
            'public/assets/scripts/built/scripts.js'
            ]
        }
      }
    },

    sass: {
      options: {
        sourceMap: true,
        importer: compass,
        outputStyle: 'nested',
        quite: false
      },
      dist: {
        files: [{
            expand: true,
            cwd: 'public/assets/styles/sass',
            src: ['app.scss'],
            dest: 'public/assets/styles/css',
            ext: '.css'
        }]
      }
    },

    //https://github.com/csscomb/csscomb.js
    //formats scss/css
    csscomb: {
        dynamic_mappings: {
            expand: true,
            cwd: 'public/assets/styles/sass/',
            src: ['**/*.scss', '!**/foundation/**/*.scss', '!**/utility/**/*.scss'],
            dest: 'public/assets/styles/sass/',
            ext: '.scss'
        }
    },

    //https://github.com/katiefenn/parker
    //analyzes CSS
    parker: {
      options: {
        metrics: [
          "TotalStylesheetSize",
          "TotalRules",
          "TotalSelectors",
          "TotalIdentifiers",
          "TotalDeclarations"
        ],
        file: "report.md",
        colophon: true,
        usePackage: true
      },
      src: [
        'public/assets/styles/css/*.min.css'
      ]
    },

    //css minifier
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'public/assets/styles/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/assets/styles/css',
          ext: '.min.css'
        }]
      }
    },

    //http://browserify.org/
    //js dependency bundler
    browserify: {
      dist: {
        files: {
          'public/assets/scripts/built/scripts.js': [
            'public/assets/scripts/main.js'
          ],
        },
        options: {
        }
      }
    },

    watch: {
      all: {
        files: ['site/**/*.php', 'public/content/**/*.txt'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['public/assets/styles/sass/**/*.scss'],
        tasks: [ 'sass' ],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['public/assets/scripts/**/*.js', '!public/assets/scripts/built/*'],
        tasks: ['browserify'],
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-csscomb');

  grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
  grunt.registerTask("init", ["copy:plugins"]);
  grunt.registerTask("compile", ["browserify", 'sass', "uglify", 'cssmin', 'csscomb' ]);

  // grunt.registerTask("get-content", ["rsync:production"]);
  // grunt.registerTask('default', [""]);

};