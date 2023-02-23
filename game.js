var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentScore) {
  if (userClickedPattern[currentScore] === gamePattern[currentScore]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 700);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("High Score: " + (level-1) + ".</br>Press A Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //animate and play sound to the sequence of random buttons
  //let keyword solved the problem of array index undefined when setTimeout is used
  //Variable i declared with let keyword always have scope in current block
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, 300 * (i + 1));

  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
