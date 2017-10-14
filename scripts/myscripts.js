// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){

// //trigger each animation to move to the next position
//   $(".next").on("click", function() {
//     var currentScene = this.getAttribute("data-current");
//
//     if ( currentScene == 1 ) {
//       this.setAttribute("data-current", 2);
//     } else if ( currentScene == 2 ) {
//       this.setAttribute("data-current", 3);
//     } else if ( currentScene == 3 ) {
//       this.setAttribute("data-current", 1);
//     }
//
//   });

//trigger each animation to move to the next position
  $(".next").on("click", function() {
    var scene = $(".scene");

    if ( scene.hasClass("pos-one") ) {
      scene.addClass("pos-two");
      scene.removeClass("pos-one");
    } else if ( scene.hasClass("pos-two") ) {
      scene.addClass("pos-three");
      scene.removeClass("pos-two");
    } else if ( scene.hasClass("pos-three") ) {
      scene.addClass("pos-four");
      scene.removeClass("pos-three");
    } else if ( scene.hasClass("pos-four") ) {
      scene.addClass("pos-five");
      scene.removeClass("pos-four");
    } else if ( scene.hasClass("pos-five") ) {
      scene.addClass("pos-six");
      scene.removeClass("pos-five");
    } else if ( scene.hasClass("pos-six") ) {
      scene.addClass("pos-seven");
      scene.removeClass("pos-six");
    } else if ( scene.hasClass("pos-seven") ) {
      scene.addClass("pos-one");
      scene.removeClass("pos-seven");
    }

  });

}); // closes the document ready function
