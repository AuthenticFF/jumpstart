/* global define: false */
/* global require: false */
/* global log: false */

// Setting up require.js paths
require.config( {
  baseUrl: "/assets/scripts",
  urlArgs: "bust=1386720089923",
  paths: {

    foundation: "../../bower_components/foundation/js/foundation",
    jquery: "../../bower_components/jquery/jquery",
    modernizr: "../../bower_components/modernizr/modernizr",
    underscore: "../../bower_components/underscore/underscore",

    // Foundation plugins
    "foundation.abide": "../../bower_components/foundation/js/foundation",
    "foundation.accordion": "../../bower_components/foundation/js/foundation",
    "foundation.alert": "../../bower_components/foundation/js/foundation",
    "foundation.clearing": "../../bower_components/foundation/js/foundation",
    "foundation.dropdown": "../../bower_components/foundation/js/foundation",
    "foundation.interchange": "../../bower_components/foundation/js/foundation",
    "foundation.joyride": "../../bower_components/foundation/js/foundation",
    "foundation.magellan": "../../bower_components/foundation/js/foundation",
    "foundation.offcanvas": "../../bower_components/foundation/js/foundation",
    "foundation.orbit": "../../bower_components/foundation/js/foundation",
    "foundation.reveal": "../../bower_components/foundation/js/foundation",
    "foundation.tab": "../../bower_components/foundation/js/foundation",
    "foundation.tooltip": "../../bower_components/foundation/js/foundation",
    "foundation.topbar": "../../bower_components/foundation/js/foundation",
  },
  shim: {

    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },

    // Foundation plguins shim
    'foundation': {
      deps: ['jquery'],
      exports: "foundation"
    },
    "foundation.abide": {
      deps: ['jquery', 'foundation']
    },
    "foundation.accordion": {
      deps: ['jquery', 'foundation']
    },
    "foundation.alert": {
      deps: ['jquery', 'foundation']
    },
    "foundation.clearing": {
      deps: ['jquery', 'foundation']
    },
    "foundation.dropdown": {
      deps: ['jquery', 'foundation']
    },
    "foundation.interchange": {
      deps: ['jquery', 'foundation']
    },
    "foundation.joyride": {
      deps: ['jquery', 'foundation']
    },
    "foundation.magellan": {
      deps: ['jquery', 'foundation']
    },
    "foundation.offcanvas": {
      deps: ['jquery', 'foundation']
    },
    "foundation.orbit": {
      deps: ['jquery', 'foundation']
    },
    "foundation.reveal": {
      deps: ['jquery', 'foundation']
    },
    "foundation.tab": {
      deps: ['jquery', 'foundation']
    },
    "foundation.tooltip": {
      deps: ['jquery', 'foundation']
    },
    "foundation.topbar": {
      deps: ['jquery', 'foundation']
    },

  }
});

// Includes File Dependencies
require([
  "jquery",
  "underscore",
  "foundation",
  "classes/sitewide"
  ], function($, _, Foundation, Sitewide){

    $(document).foundation();

    // Intantiating template js
    var template_name = $("[data-template]").data("template");

    if(template_name === "home"){
      require(["templates/Home"], function(HomeTemplate){
        var template = new HomeTemplate();
        template.init();
      });
    }

});