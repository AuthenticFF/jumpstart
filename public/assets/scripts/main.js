"use strict";

global.$ = global.jQuery = require('jquery');
global._ = window._ = require('underscore');

window.easings = {};
window.easings.ease = [0.25, 0.46, 0.45, 0.94];
window.easings.andrew = [0.77, 0, 0.175, 1];
window.easings.feebles1 = [.8,.03,.25,1];
window.easings.feebles2 = [.72,.01,.25,1];
window.easings.ease2 = [.48,.1,.48,.9];

require("./foundation-init");

// The sitewide include, for modules and things happening on multiple pages
var Sitewide = require('./classes/Sitewide.js');
var sitewide = new Sitewide();
var isFirstLoad = true;

/**
 * The method we call when our page loads
 */
var onPageLoad = function(){

  if(isFirstLoad){
    Foundation.addToJquery($);
    sitewide.init();
    isFirstLoad = false;
  }

  $(document).foundation();

};

$(document).ready(function(){
  onPageLoad();
});
