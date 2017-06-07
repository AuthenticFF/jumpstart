

module.exports = function (shipit) {

  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({

    default: {

      // Codebase details
      workspace: '.tmp',
      repositoryUrl: '[ENTER REPO]',
      branch: 'master',
      ignores: ['.git'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa',
      shallowClone: true,

      // Shared directory details
      // shared: {
      //   overwrite: true,
      //   dirs: ['craft/storage', 'public/content']
      // },

    },

    // Staging Server
    staging: {
      deployTo: '/var/www/[WEBSITE]',
      servers: ['USER@IPADDRESS:PORT'],
    },

    // Production Server
    production: {
      deployTo: '/var/www/[WEBSITE]',
      servers: ['USER@IPADDRESS:PORT'],
    }

  });

  shipit.on('published', function () {

    var current = shipit.releasePath;
    var environment = shipit.environment;

    // return shipit.remote('echo "Post Deployment Tasks"').then(function(){
    //     return shipit.remote('chmod -R 777 ' + current + '/craft/storage');
    // }).then(function(){
    //     return shipit.remote('chmod -R 777 ' + current + "/public/content");
    // }).then(function(){
    //     return shipit.remote('chmod -R 777 ' + current + "/craft/config");
    // }).then(function(){
    //     return shipit.remote('rm ' + current + "/public/.htaccess");
    // }).then(function(){
    //     return shipit.remote('mv ' + current + "/public/.htaccess." + environment + " " + current + "/public/.htaccess");
    // }).then(function(){
    //     return shipit.remote('rm ' + current + "/public/robots.txt");
    // }).then(function(){
    //     return shipit.remote('mv ' + current + "/public/robots.txt." + environment + " " + current + "/public/robots.txt");
    // });

  });

};
