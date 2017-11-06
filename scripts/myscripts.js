// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){
// hide the loading spinner
$(".loading").css("display","none");

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

  // I was so stoked when I found out I could loop through an array instead of all the if else statements I had before. Seems much more logical and succinct this way.
  // create array for all the pos classes
  var slide = [
    "pos-one",
    "pos-two",
    "pos-three",
    "pos-four",
    "pos-five",
    "pos-six",
    "pos-seven",
    "pos-quiz"
  ]

  counter = 0;
  body = $("body");

  //declare function to progress slide forwards
  function nextSlide(){
    console.log("hello");
    counterCurrent = counter;
    counter = (counter + 1 ) % slide.length; // using ,modulus so that it loops back through
    body.addClass(slide[counter]);
    body.removeClass(slide[counterCurrent] );
  };

  //declare function to reverse through slides
  function prevSlide(){
    if (body.hasClass("pos-one")) {
      return;
    } else {
      counterCurrent = counter;
      counter = counter - 1;
      body.addClass(slide[counter]);
      body.removeClass(slide[counterCurrent] );
    }
  }
  
// on click next btn progress through array
  $(".next").on("click", nextSlide);

//on click prev btn reverse through the array
  $(".previous").on("click", prevSlide);

// listening for keydown and executing next or prev slide fucntions if the left or right arrow keys are pressed.
$(document).on("keydown", function(e) {
  if (e.keyCode == 39) {
    nextSlide();
  } else if (e.keyCode == 37) {
    prevSlide();
  }
});

// code for quiz section
$("#quiz-submit").on("click", function(){
    //loop through each question
    
    //create score variable
      var score = 0;
    
    $(".question").each(function(){
      
    //remove correction class
      var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.removeClass("correction");
      
      
      //remove all message divs
      $('.quiz-msg', this).remove();
      
      var correct = $(this).find(":checked[data-correct]").length;
      //console.log(correct);
      
      
      //check answer
      if(correct == 1){
        //alert("correct!");
        var msgHtml = '<div class="quiz-msg correct">Success!</div>';
        $(this).append(msgHtml);
        
        //add one to the score
        score++;
        
      } else {
        //alert("incorrect");
        var msgIncorrect = '<div class="quiz-msg incorrect">Incorrect</div>';
        $(this).append(msgIncorrect);
        
        //find the correct radio button and add class
        var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.addClass("correction");
        
      }
      
    });
    
    //output score on the screen
    $('#score').text(score);

    if (score == 3) {

    }
    
  });




//   //code to morph the svg button on hover
//   var createBouncyButtons = (function() {
//   function createButton(el) {
//     var pathEl = el.querySelector('path');
//     var spanEl = el.querySelector('span');
//     function hover() {
//       anime.remove([pathEl, spanEl]);
//       anime({
//         targets: pathEl,
//         d: 'M290,90Q150,100,10,90Q0,50,10,10Q150,0,290,10Q300,50,290,90',
//         elasticity: 700,
//         offset: 0
//       });
//       anime({
//         targets: spanEl,
//         scale: 1.4,
//         duration: 800,
//         offset: 0
//       });
//     }
//     function down() {
//       anime.remove([pathEl, spanEl]);
//       anime({
//         targets: pathEl,
//         d: 'M280,80Q150,80,20,80Q20,50,20,20Q150,20,280,20Q280,50,280,80',
//         elasticity: 700,
//         offset: 0
//       });
//       anime({
//         targets: spanEl,
//         scale: 1,
//         duration: 800,
//         offset: 0
//       });
//     }
//     el.onmouseenter = hover;
//     el.onmousedown = down;
//     el.onmouseleave = down;
//   }

//   var buttonEls = document.querySelectorAll('.btn');

//   for (var i = 0; i < buttonEls.length; i++) {
//     var el = buttonEls[i];
//     createButton(el);
//   }

// })();


}); // closes the document ready function
