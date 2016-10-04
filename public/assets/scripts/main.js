"use strict";

global.$ = global.jQuery = require('jquery');
global._ = window._ = require('underscore');
require("./foundation-init");

// The sitewide include, for modules and things happening on multiple pages
var Sitewide = require('./classes/Sitewide.js');

// Individual template files, for unique templates
var HomeTemplate = require('./templates/Home.js');

$(window).ready(function(){

  $(document).foundation();

  var template = window.template;
  var templateClass = false;

  if(typeof template === 'undefined'){
    // nothing
  }else if(template === 'home'){
    templateClass = new HomeTemplate();
  }

  var sitewide = new Sitewide();
  sitewide.init();

  if(templateClass !== false){
    templateClass.init();
  }

});