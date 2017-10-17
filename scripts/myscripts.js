// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){
// hide the loading spinner
$(".loading").css("display","none");

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
      body.addClass("pos-quiz");
      body.removeClass("pos-seven");
    } else if ( body.hasClass("pos-quiz") ) {
      body.addClass("pos-one");
      body.removeClass("pos-quiz");
    }

  });

  //trigger the secondary info triggers to open the info slider and move position
  $(".secondary-info-trigger").on("click", function() {
    var body = $("body");
    if ( body.hasClass("pos-three")) {
      body.addClass("pos-three-a");
    } else if ( body.hasClass("pos-four")) {
      body.addClass("pos-four-a");
    } else if ( body.hasClass("pos-five")) {
      body.addClass("pos-five-a");
    } else if ( body.hasClass("pos-six")) {
      body.addClass("pos-six-a");
    }
  });

  //remove classes when close button clicked
  $(".close-btn").on("click", function() {
    var body = $("body");
    body.removeClass("pos-three-a pos-four-a pos-five-a pos-six-a");
  });

  //code to morph the svg button on hover
  var createBouncyButtons = (function() {
  function createButton(el) {
    var pathEl = el.querySelector('path');
    var spanEl = el.querySelector('span');
    function hover() {
      anime.remove([pathEl, spanEl]);
      anime({
        targets: pathEl,
        d: 'M290,90Q150,100,10,90Q0,50,10,10Q150,0,290,10Q300,50,290,90',
        elasticity: 700,
        offset: 0
      });
      anime({
        targets: spanEl,
        scale: 1.4,
        duration: 800,
        offset: 0
      });
    }
    function down() {
      anime.remove([pathEl, spanEl]);
      anime({
        targets: pathEl,
        d: 'M280,80Q150,80,20,80Q20,50,20,20Q150,20,280,20Q280,50,280,80',
        elasticity: 700,
        offset: 0
      });
      anime({
        targets: spanEl,
        scale: 1,
        duration: 800,
        offset: 0
      });
    }
    el.onmouseenter = hover;
    el.onmousedown = down;
    el.onmouseleave = down;
  }

  var buttonEls = document.querySelectorAll('.btn');

  for (var i = 0; i < buttonEls.length; i++) {
    var el = buttonEls[i];
    createButton(el);
  }

})();


}); // closes the document ready function
