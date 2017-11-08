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
    counterCurrent = counter;
    counter = (counter + 1 ) % slide.length; // using ,modulus so that it loops back through
    body.addClass(slide[counter]);
    body.removeClass(slide[counterCurrent] );
    // animate the current slide indicator to next position
    if ( counter == 0) {
      $(".progress-indicate .current").animate({ left: "38px" }, 1000);
    } else {
      $(".progress-indicate .current").animate({ left: "+=35px" }, 1000);
    }
    // animate clouds between slide 6 and 7 then instantly return them back to their original position
    if (counter == 6) {
      $(".clouds, .clouds-02, clouds-03").animate({ left: "-50%" }, 2000, function() {
        $(this).animate({ left : "0"}, 1)
      });
    }
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
    // animate the current slide indicator to prev position
    $(".progress-indicate .current").animate({ left: "-=35px" }, 1000);
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

  // make it rain
  var numRain = 200;

  //function to generate random locations
  function randRange (min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  //create the rain at random locations
    for( i=1; i < 100; i++) {
      var rainIndex = 1;
      function createRain() {
        setTimeout (function() {
          var rainXPos = randRange(0,100);
          $(".scene").prepend("<div class='rain' id='rain"+rainIndex+"'></div>");
          $("#rain"+rainIndex).css("left", rainXPos + "%");
          rainIndex++;
        }, randRange(0,2000));
      }; // end of create rain function
      createRain();
    }; // end of for loop
  

  // code for quiz section
  $("#quiz-submit").on("click", function(){
    
    //create score variable
    var score = 0;

    //loop through each question
    $(".question").each(function(i){
      
      //remove correction class
      var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.removeClass("correction");
      
      
      //remove all message divs
      $('.quiz-msg', this).remove();
      
      var correct = $(this).find(":checked[data-correct]").length;
      
      //check answer
      if(correct == 1){
        //alert("correct!");
        var msgHtml = '<svg class="correct-icon quiz-msg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + '<title>correct answer</title>' + '<circle class="circle" cx="50" cy="50" r="50"/>' + '<path class="tick" d="M43.75,75.5a5.5,5.5,0,0,1-3.3-1.1l-20-15a5.5,5.5,0,1,1,6.6-8.8L42.43,62.13,67.94,24.42a5.5,5.5,0,0,1,9.12,6.16L48.31,73.08a5.52,5.52,0,0,1-3.65,2.34A5.59,5.59,0,0,1,43.75,75.5Z"/>' + '</svg>';
        $(this).append(msgHtml);
        
        //add one to the score
        score++;
        
      } else {
        //alert("incorrect");
        var msgIncorrect = '<svg class="incorrect-icon quiz-msg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + '<title>wrong answer</title>' + '<circle class="circle" cx="50" cy="50" r="50"/>' + '<path class="cross" d="M57.07,50,75.63,31.44a5,5,0,0,0-7.07-7.07L50,42.93,31.44,24.37a5,5,0,0,0-7.07,7.07L42.93,50,24.37,68.56a5,5,0,0,0,0,7.07,5,5,0,0,0,7.07,0L50,57.07,68.56,75.63a5,5,0,0,0,7.07-7.07Z"/>' + '</svg>';
        $(this).append(msgIncorrect);
        
        //find the correct radio button and add class
        var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.addClass("correction");
      }
    }); // end of question check each function
    
    //output score on the screen
    $('#score-num').text(score);

    // if all answers correct launch the modal
    if (score == 3) {
      launchModal();
    }
    
  }); // end quiz submit button function

  // function containing the modal initialisation and settings
  function launchModal () {
    $('.congrats').avgrund({
        width: 380, // max is 640px
        height: 280, // max is 350px
        showClose: true, // switch to 'true' for enabling close button
        showCloseText: 'close', // type your text for close button
        closeByEscape: true, // enables closing popup by 'Esc'..
        closeByDocument: false, // ..and by clicking document itself
        holderClass: 'congrats', // lets you name custom class for popin holder..
        overlayClass: '', // ..and overlay block
        enableStackAnimation: false, // enables different type of popin's animation
        onBlurContainer: '.scene', // enables blur filter for specified block
        openOnEvent: false, // set to 'false' to init on load
        setEvent: 'click', // use your event like 'mouseover', 'touchmove', etc.
        onLoad: function (elem) {  }, // set custom call before popin is inited..
        onUnload: function () { nextSlide() }, // after it's closed go back to the first slide.
        template: 'Congratulations you answered all the questions correctly!' // or function (elem) { ... }, or selector $('.content')
      });
  };




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
