window.$ = window.jQuery = require('jquery');
var _ = window._ = require('underscore');
var foundation = require('foundation');
var HomeTemplate = require('./templates/home.js');
var Sitewide = require('./classes/sitewide.js');

$(document).foundation();

$(window).ready(function(){

  if(template === 'home'){
    template = new HomeTemplate();
  }

  Sitewide.init();

  if (template !== undefined) {
    template.init();
  }

});