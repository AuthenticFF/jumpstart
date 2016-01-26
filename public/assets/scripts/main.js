"use strict";

window.$ = window.jQuery = require('jquery');
var _ = window._ = require('underscore');
var foundation = require('foundation-sites');

// The sitewide include, for modules and things happening on multiple pages
var Sitewide = require('./classes/sitewide.js');

// Individual template files, for unique templates
var HomeTemplate = require('./templates/home.js');

$(document).foundation();

$(window).ready(function(){

  var template = window.template;

  if(typeof template === 'undefined'){
    // nothing
  }else if(template === 'home'){
    template = new HomeTemplate();
  }

  Sitewide.init();

  if(typeof template === 'undefined'){
    template.init();
  }

});