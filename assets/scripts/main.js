



$(window).ready(function(){

  var sitewide = new Sitewide();

  var template_name = $("[data-template]").data("template");

  if(template_name === "home"){
    require(["templates/Home"], function(HomeTemplate){
      var template = new HomeTemplate();
      template.init();
    });
  }

  //test bryant hughes joseph here we go test

});