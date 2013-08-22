module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    settings: grunt.file.readJSON('config/grunt_settings.json'),

    deployments: {
      options:{
        "backups_dir": "db",
        "replace_url": false
      },
      local:{
        "title": "Local",
        "database": "<%- settings.db.local.database %>",
        "user": "<%- settings.db.local.user %>",
        "pass": "<%- settings.db.local.pass %>",
        "host": "<%- settings.db.local.host %>",
        // note that the `local` target does not have an "ssh_host"
      },
      staging:{
        "title": "Staging",
        "database": "",
        "user": "",
        "pass": "",
        "host": "",
        "ssh_host": "root@0.0.0.0.0 -p 1234"
      },
      production:{
        "title": "Production",
        "database": "",
        "user": "",
        "pass": "",
        "host": "",
        "ssh_host": ""
      }
    },

    copy: {
      plugins: {
        files: [

          // Foundation
          {cwd: "bower_modules/foundation/js", src: '**', dest: 'assets/scripts/vendor', expand: true, flatten: false},
          {cwd: "bower_modules/foundation/scss/foundation", src: '**', dest: 'assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_modules/foundation/scss", src: 'foundation.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_modules/foundation/scss", src: 'normalize.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},

          {expand: true, flatten: false, cwd: "bower_modules/jquery", src: 'jquery.js', dest: 'assets/scripts/vendor/', filter: 'isFile'},
          {expand: true, flatten: false, cwd: "bower_modules/requirejs", src: 'require.js', dest: 'assets/scripts/vendor/', filter: 'isFile'},
          {expand: true, flatten: false, cwd: "bower_modules/underscore", src: 'underscore.js', dest: 'assets/scripts/vendor/', filter: 'isFile'},
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "assets/scripts",
          mainConfigFile: "assest/scripts/main.js",
          out: "assets/scripts/main-built.js"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-rsync");

  grunt.registerTask("copy-plugins", ["copy:plugins"]);

  //Default task(s).
  //grunt.registerTask('default', [""]);




};