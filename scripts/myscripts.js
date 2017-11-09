// Document information
// My scripts file for the water cycle interactve learning site
// Author: Luke Carl Thompson

$(document).ready(function(){
  // hide the loading spinner when the js file initialises
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

  // create array for all the pos classes to loop through in the next and prev functions
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

  // Rain section **********************************/
  // the number of rain drops in each cycle
  var numRain = 50;

  //function to generate random numbers within a range
  function randRange (min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  //create the rain at random locations every two seconds, it takes two seconds for the rain animation to finish
    for( i=1; i < numRain; i++) {
      var rainIndex = 1;
      function createRain() {
        setTimeout (function() {
          var rainXPos = randRange(10,70);
          $(".scene").prepend("<div class='rain' id='rain"+rainIndex+"'></div>");
          $("#rain"+rainIndex).css("left", rainXPos + "%");
          rainIndex++;
        }, randRange(0,2000));
      }; // end of create rain function
      createRain(); // make it rain
    }; // end of for loop
  
  // Quiz section ***************************************/
  $("#quiz-submit").on("click", function(){ // on clicking the submit button for the quiz
    
    //create score variable
    var score = 0;

    //loop through each question
    $(".question").each(function(i){
      
      //remove correction class
      var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.removeClass("correction");
      
      
      //remove all message divs
      $('.quiz-msg', this).remove();
      
      var correct = $(this).find(":checked[data-correct]").length; // find number of correct answers
      
      //check answer
      if(correct == 1){ //if answer is correct add the checkmark icon
        var msgHtml = '<svg class="correct-icon quiz-msg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + '<title>correct answer</title>' + '<circle class="circle" cx="50" cy="50" r="50"/>' + '<path class="tick" d="M43.75,75.5a5.5,5.5,0,0,1-3.3-1.1l-20-15a5.5,5.5,0,1,1,6.6-8.8L42.43,62.13,67.94,24.42a5.5,5.5,0,0,1,9.12,6.16L48.31,73.08a5.52,5.52,0,0,1-3.65,2.34A5.59,5.59,0,0,1,43.75,75.5Z"/>' + '</svg>';
        $(this).append(msgHtml);
        
        //and add one to the score
        score++;
        
      } else { // if not correct the add the cross icon
        var msgIncorrect = '<svg class="incorrect-icon quiz-msg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + '<title>wrong answer</title>' + '<circle class="circle" cx="50" cy="50" r="50"/>' + '<path class="cross" d="M57.07,50,75.63,31.44a5,5,0,0,0-7.07-7.07L50,42.93,31.44,24.37a5,5,0,0,0-7.07,7.07L42.93,50,24.37,68.56a5,5,0,0,0,0,7.07,5,5,0,0,0,7.07,0L50,57.07,68.56,75.63a5,5,0,0,0,7.07-7.07Z"/>' + '</svg>';
        $(this).append(msgIncorrect);
        
        //then find the correct radio button and add class
        var correctRadio = $(this).find("[data-correct]").parent();
        correctRadio.addClass("correction");
      }
    }); // end of question check each function
    
    //output score to the screen
    $('#score-num').text(score);

    // if all answers correct launch the modal and move to the next side
    if (score == 3) {
      launchModal();
      nextSlide();
    }
    
  }); // end quiz submit button function

  // Modal initialisation and settings ***************************/
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

  //start the ambience when document is clicked, most browser won't allow autoplay these days and safari blocks autoplay on hover or mouseover too. So I've compromised by maing it play when a user clicks anywhere in the viewport div.
  var ambience = document.getElementById("ambience"); // var for the background rain sounds

  $(".viewport").on("click", function(){
    ambience.play(); // play the rain sounds

  });

  // bodymovin kid animation **************************************/
  var container = document.getElementById('kid'); // target the div, bodymovin library doesn't work with jquery objects or class selectors

  var params = { container: container, // settings for the bodymovin kid animation
                  renderer: 'svg',
                  loop: true,
                  autoplay: true,
                  path: 'bodymovin/kid.json' // the path to the animation json
                };
                  
  var kid = bodymovin.loadAnimation(params); // loading the animation parameters

  var kidSpeakTrigger = document.getElementById('kid'); // targeting the trigger to make the kid speak

  var kidSpeak = [ //array of different sounds the kid can make
    document.getElementById('voice1'),
    document.getElementById('voice2'),
    document.getElementById('voice3'),
    document.getElementById('voice4'),
    document.getElementById('voice5')
  ];

  kidSpeakTrigger.addEventListener("click", function (){ // make a sound when clicking the kid
    var randm = randRange (0, 4); // using the random number generator from before to help select one of the sounds from array
    kidSpeak[randm].currentTime = 0; // setting the sound back to zero first, this is needed in case the chosen sound is already playing
    kidSpeak[randm].play(); // say something kid
  });

// bodymovin birds animation, same setup as the kid animation except this one doesn't loop or autoplay
var container = document.getElementById('birds');

var params = { container: container, // the dom element that will contain the animation
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'bodymovin/birds.json' // the path to the animation json
              };
                
var birds = bodymovin.loadAnimation(params);

var treeTrigger = document.getElementById('trees-trigger'); // triggered by the tree icon and the tree itself
var tree = document.getElementById('tree');

var audioBirds = document.getElementById('birds-chirping'); // var for the sound

treeTrigger.addEventListener("click", function (){ // when clicking the trigger play the animation and sound
  birds.play();
  audioBirds.play();
});

tree.addEventListener("click", function (){ // when clicking the tree play the animation and sound
  birds.play();
  audioBirds.play();
});

birds.addEventListener("complete", function (){ // wait until the animation is finished the stop it, this is needed so it will play more then once
    birds.stop();
  });
  
  //fish animation, same setup as the birds animation but without sound :(
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
    setTimeout( function(){ // make it wait 2s before playing the animation
      fish.play();
    // audioFish.play();
    }, 2000);
  });

  ocean.addEventListener("click", function (){ // play fish animation when clicking the ocean
      fish.play();
    // audioFish.play();
  });

  fish.addEventListener("complete", function (){ // wiat until fish animation is complete then stop it, this is needed so it will play again
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


}); // closes the document ready function
