// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){
  // hide the loading spinner
  $(".loading").addClass("loading-complete");

  //trigger the secondary info triggers to open the info slider and move position
  $(".secondary-info-trigger").on("click", function() {
    var body = $("body");
    if ( body.hasClass("pos-three")) {
      body.addClass("pos-three-a more-info");
    } else if ( body.hasClass("pos-four")) {
      body.addClass("pos-four-a more-info");
    } else if ( body.hasClass("pos-five")) {
      body.addClass("pos-five-a more-info");
    } else if ( body.hasClass("pos-six")) {
      body.addClass("pos-six-a more-info");
    }
  });

  //remove classes when close button clicked
  $(".close-btn").on("click", function() {
    var body = $("body");
    body.removeClass("pos-three-a pos-four-a pos-five-a pos-six-a more-info");
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
    "pos-quiz",
    "pos-modal"
  ]

  counter = 0;
  body = $("body");

  //declare function to progress slide forwards
  function nextSlide(){
    if ( body.hasClass("more-info")) {
      console.log("should do nothing");
      return;
    } else {
        counterCurrent = counter;
        counter = (counter + 1 ) % slide.length; // using ,modulus so that it loops back through
        body.addClass(slide[counter]);
        body.removeClass(slide[counterCurrent] );
    }
    // animate the current slide indicator to next position
    if ( counter == 0) {
      $(".progress-indicate .current").animate({ left: "38px" }, 1000); // returns the slide counter back to slide 1 position
    } else if (counter == 8) { // this stops the slide counter moving on the modal popup screen
      return;
    } else {
      $(".progress-indicate .current").animate({ left: "+=35px" }, 1000); // moves the slide counter across to the next spot relative to where ti already is
    }
    // animate clouds between slide 6 and 7 then instantly return them back to their original position
    if (counter == 6) {
      $(".clouds, .clouds-02, clouds-03").animate({ left: "-50%" }, 2000, function() {
        $(this).animate({ left : "0"}, 1)
      });
    }
    if (counter == 4) {
      // start the evaporation animation
      console.log("evaporation should play");
      setTimeout( function(){
        evaporation.play();
        // audioEvaporation.play();
      }, 1500);
    } else if (counter == 6 || counter == 4) {
      console.log("evaporation should stop");
      evaporation.stop();
    }
  };

  //declare function to reverse through slides
  function prevSlide(){
    if (body.hasClass("pos-one")) { // stop user from going backwards from starting slide
      return;
    } else if ( body.hasClass("more-info")) { // stop slide prgression on the more info screens
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
      if (!body.hasClass("pos-quiz")) {
        nextSlide();
      }
    } else if (e.keyCode == 37) {
      prevSlide();
    }
  });

  // // make it rain
  // var numRain = 200;

  // //function to generate random locations
  function randRange (min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  // //create the rain at random locations
  //   for( i=1; i < 100; i++) {
  //     var rainIndex = 1;
  //     function createRain() {
  //       setTimeout (function() {
  //         var rainXPos = randRange(10,70);
  //         $(".scene").prepend("<div class='rain' id='rain"+rainIndex+"'></div>");
  //         $("#rain"+rainIndex).css("left", rainXPos + "%");
  //         rainIndex++;
  //       }, randRange(0,2000));
  //     }; // end of create rain function
  //     createRain();
  //   }; // end of for loop
  

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
      nextSlide();
    }
    
  }); // end quiz submit button function

  // function containing the modal initialisation and settings
  function launchModal () {
    $('.congrats').avgrund({
        width: 380, // max is 640px
        height: 280, // max is 350px
        showClose: true, // switch to 'true' for enabling close button
        showCloseText: '', // type your text for close button
        closeByEscape: true, // enables closing popup by 'Esc'..
        closeByDocument: true, // ..and by clicking document itself
        holderClass: 'congrats', // lets you name custom class for popin holder..
        overlayClass: '', // ..and overlay block
        enableStackAnimation: false, // enables different type of popin's animation
        onBlurContainer: '.scene', // enables blur filter for specified block
        openOnEvent: false, // set to 'false' to init on load
        setEvent: 'click', // use your event like 'mouseover', 'touchmove', etc.
        onLoad: function (elem) {  }, // set custom call before popin is inited..
        onUnload: function () { nextSlide();}, // after it's closed do something
        template: '<h1>Congratulations</h1><p>You answered all the questions correctly!</p><img src="images/cool.png">' // or function (elem) { ... }, or selector $('.content')
      });
  };

  //start the ambience
  var ambience = document.getElementById("ambience");

  $(".viewport").on("click", function(){
    ambience.play(); 

  });

  // bodymovin kid animation
  var container = document.getElementById('kid');

  var params = { container: container, // the dom element that will contain the animation
                  renderer: 'svg',
                  loop: true,
                  autoplay: true,
                  path: 'bodymovin/kid.json' // the path to the animation json
                };
                  
  var kid = bodymovin.loadAnimation(params);

  var kidSpeakTrigger = document.getElementById('kid');

  // var kidSpeak = document.getElementById('kid-speak');

  var kidSpeak = [
    document.getElementById('voice1'),
    document.getElementById('voice2'),
    document.getElementById('voice3'),
    document.getElementById('voice4'),
    document.getElementById('voice5')
  ];

  kidSpeakTrigger.addEventListener("click", function (){
    var randm = randRange (0, 4);
    kidSpeak[randm].currentTime = 0;
    kidSpeak[randm].play();
  });

// bodymovin birds animation
var container = document.getElementById('birds');

var params = { container: container, // the dom element that will contain the animation
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'bodymovin/birds.json' // the path to the animation json
              };
                
var birds = bodymovin.loadAnimation(params);

var treeTrigger = document.getElementById('trees-trigger');
var tree = document.getElementById('tree');

var audioBirds = document.getElementById('birds-chirping');

treeTrigger.addEventListener("click", function (){
  birds.play();
  audioBirds.play();
});

tree.addEventListener("click", function (){
  birds.play();
  audioBirds.play();
});

birds.addEventListener("complete", function (){
    birds.stop();
  });
  
  //fish animation
  var fishContainer = document.getElementById('fish');

  var params = { container: fishContainer, // the dom element that will contain the animation
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'bodymovin/fish.json' // the path to the animation json
              };
                
  var fish = bodymovin.loadAnimation(params);

  var oceanTrigger = document.getElementById('ocean-trigger');
  var ocean = document.getElementById('ocean');

// var audioFish = document.getElementById('fish-splashing');

  oceanTrigger.addEventListener("click", function (){
    console.log("fish should play");
    setTimeout( function(){
      fish.play();
    // audioFish.play();
    }, 2000);
  });

  ocean.addEventListener("click", function (){
    console.log("fish should play");
      fish.play();
    // audioFish.play();
  });

  fish.addEventListener("complete", function (){
    fish.stop();
  });


    //evaporation animation loaded. this is called by the slide counter function above to start and stop on the relevant slides
  var evaporationContainer = document.getElementById('evaporation');

  var params = { container: evaporationContainer, // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: 'bodymovin/evaporation.json' // the path to the animation json
              };
                
  var evaporation = bodymovin.loadAnimation(params);





// tree.addEventListener("click", function() {
//   birdsAnim.play();
// });

// // bodymovin test
// var container = document.getElementById('bodymovin-test');

// bodymovin.loadAnimation({
// container: container, // the dom element that will contain the animation
// renderer: 'svg',
// loop: true,
// autoplay: true,
// path: 'bodymovin/data.json' // the path to the animation json
// });


}); // closes the document ready function
