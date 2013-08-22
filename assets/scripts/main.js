/* global define: false */
/* global require: false */
/* global log: false */

// Setting up require.js paths
require.config( {

  baseUrl: "/assets/scripts",


  urlArgs: "bust=" +  (new Date()).getTime(),

  paths:{
    "jquery": "vendor/jquery",
    "underscore": "vendor/underscore",
  },

  shim: {
    'underscore': {
      exports: "_"
    }
  }

});

// Includes File Dependencies
require([
  "jquery",
  "underscore",
  "classes/sitewide"
  ], function($, _, Sitewide){


    // Intantiating template js
    var template_name = $("[data-template]").data("template");

    if(template_name === "home"){
      require(["templates/Home"], function(HomeTemplate){
        var template = new HomeTemplate();
        template.init();
      });
    }


});