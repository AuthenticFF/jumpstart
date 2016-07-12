// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // deployments: grunt.file.readJSON("config/settings/deployments.json"),
    // rsync: grunt.file.readJSON("config/settings/rsync.json"),

    clean: {
      hooks: ['.git/hooks/pre-commit']
    },

    // cacheBust: {
    //   options: {
    //     assets: [
    //       'public/assets/images/**',
    //       'public/assets/fonts/**'
    //     ]
    //   },
    //   src:['craft/templates/_layout.html']
    // },

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
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "node_modules/foundation-sites/scss", src: 'foundation.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "node_modules/foundation-sites/scss", src: 'normalize.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},
        ]
      }
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
        includePaths: require('node-bourbon').includePaths,
        outputStyle: 'nested',
        quite: false
      },
      dist: {
        files: {
          'public/assets/styles/css/app.css': 'public/assets/styles/sass/app.scss'
        },
      }
    },

    //https://github.com/csscomb/csscomb.js
    //formats scss/css
    // csscomb: {
    //     dynamic_mappings: {
    //         expand: true,
    //         cwd: 'public/assets/styles/sass/',
    //         src: ['**/*.scss', '!**/foundation/**/*.scss', '!**/utility/**/*.scss'],
    //         dest: 'public/assets/styles/sass/',
    //         ext: '.scss'
    //     }
    // },

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

    // imagemin: {
    //   static: {
    //     options: {
    //       optimizationLevel: 3,
    //       svgoPlugins: [{ removeViewBox: false }],
    //       use: [mozjpeg()]
    //     },
    //     files: {
    //       'public/assets/images/**/*.png': 'public/assets/images/**/*.png',
    //       'public/assets/images/**/*.jpg': 'public/assets/images/**/*.jpg',
    //       'public/assets/images/**/*.gif': 'public/assets/images/**/*.gif'
    //     }
    //   },
    //   dynamic: {
    //     files: [{
    //       expand: true,
    //       cwd: 'public/assets/images/',
    //       src: ['**/*.{png,jpg,gif}'],
    //       dest: 'public/assets/images/'
    //     }]
    //   }
    // },

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
  grunt.loadNpmTasks('grunt-cache-bust');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks("grunt-rsync");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-csscomb');

  grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
  grunt.registerTask("init", ["copy:plugins"]);
  grunt.registerTask("compile", ["browserify", 'sass', "uglify", 'cssmin']);

  // grunt.registerTask("sync-down", ["db_pull","rsync:dev"]);
  // grunt.registerTask("get-content", ["rsync:production"]);

};
