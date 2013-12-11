module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    // loading our settings vars
    settings: grunt.file.readJSON('config/grunt_settings.json'),

    // -- Handling DB migrations
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
        "database": "<%- settings.db.staging.database %>",
        "user": "<%- settings.db.staging.user %>",
        "pass": "<%- settings.db.staging.pass %>",
        "host": "<%- settings.db.staging.host %>",
        "ssh_host": "<%- settings.db.staging.ssh_host %>"
      },
      production:{
        "title": "Production",
        "database": "<%- settings.db.production.database %>",
        "user": "<%- settings.db.production.user %>",
        "pass": "<%- settings.db.production.pass %>",
        "host": "<%- settings.db.production.host %>",
        "ssh_host": "<%- settings.db.production.ssh_host %>"
      }
    },

    // -- Syncing files from Prod to Local
    rsync: {
      // staging: {
      //   options: {
      //     args: ["-e ssh -p24","--recursive","-avz","--progress", "--verbose"],
      //     src: "user@0.0.0.0:/content/",
      //     dest: "./content",
      //   }
      // },
      production: {
        options: {
          args: ["-e ssh","--recursive","-avz","--progress", "--verbose"],
          src: "user@0.0.0.0:/content/",
          dest: "./content",
        }
      },
    },


    // -- Copying plugins from bower_components to vendor
    copy: {
      plugins: {
        files: [

          // Foundation
          {cwd: "bower_components/foundation/js", src: '**', dest: 'assets/scripts/vendor', expand: true, flatten: false},
          {cwd: "bower_components/foundation/scss/foundation", src: '**', dest: 'assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'foundation.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "bower_components/foundation/scss", src: 'normalize.scss', dest: 'assets/styles/sass/', expand: true, flatten: false},

          {expand: true, flatten: false, cwd: "bower_components/requirejs", src: 'require.js', dest: 'assets/scripts/vendor/', filter: 'isFile'},
        ]
      }
    },


    // -- Require.js Compiling
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "assets/scripts",
          mainConfigFile: "assest/scripts/main.js",
          out: "assets/scripts/main-built.js"
        }
      }
    },


    // -- Adding bower packages to require.js paths
    bower: {
      target: {
        rjsConfig: 'assets/scripts/main.js',
        options: {
          exclude: ['requirejs']
        }
      }
    }

  });


  // TASKS
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-rsync");

  grunt.registerTask("copy-plugins", ["copy:plugins"]);
  grunt.registerTask("content_pull", ["rsync:production"]);
  grunt.registerTask("copy-bower", ["bower"]);

  //Default task(s).
  //grunt.registerTask('default', [""]);




};