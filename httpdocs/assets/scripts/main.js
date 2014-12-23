$(window).ready(function(){

  if(template === "home"){
    template = new HomeTemplate();
  }

  Sitewide.init();

  if (template !== undefined) {
    template.init();
  }

});