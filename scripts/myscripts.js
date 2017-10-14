// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){

//trigger each animation to move to the next position
  $(".next").on("click", function() {
    var body = $("body");

    if ( body.hasClass("pos-one") ) {
      body.addClass("pos-two");
      body.removeClass("pos-one");
    } else if ( body.hasClass("pos-two") ) {
      body.addClass("pos-three");
      body.removeClass("pos-two");
    } else if ( body.hasClass("pos-three") ) {
      body.addClass("pos-four");
      body.removeClass("pos-three");
    } else if ( body.hasClass("pos-four") ) {
      body.addClass("pos-five");
      body.removeClass("pos-four");
    } else if ( body.hasClass("pos-five") ) {
      body.addClass("pos-six");
      body.removeClass("pos-five");
    } else if ( body.hasClass("pos-six") ) {
      body.addClass("pos-seven");
      body.removeClass("pos-six");
    } else if ( body.hasClass("pos-seven") ) {
      body.addClass("pos-one");
      body.removeClass("pos-seven");
    }

  });

}); // closes the document ready function
