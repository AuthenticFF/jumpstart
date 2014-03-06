$(window).ready(function(){

  var template_name = $("[data-template]").data("template");
  var template;

  if(template_name === "home"){
    template = new HomeTemplate();
  } else if(template_name === '' | template_name === undefined) {
    template = undefined;
  }

  Sitewide.init();
  
  if (template !== undefined) {
    template.init();
  }

});