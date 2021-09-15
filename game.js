var buttonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern =[]; 
var userClickedPattern=[]; 

var level = 0;
var started = false;  

$(document).keydown(function(){
    if(!started){
        //the game didnt start yet. 
        //we also need to change heading to 0. 
        $("#level-title").text("Level " + level); 
        nextSequence(); 
        started = true; //toggle it to started
    }
}); 

//User Clicks:
$(".btn").click(function(event){
    //when the button is clicked, we need to store the ID of the click. 
    userClickedPattern.push(event.target.id);
    //it has to play sound for the click as well. 
    playSound(event.target.id); 
    animatePress(event.target.id); 
    checkAnswer(userClickedPattern.length-1); //max length - 1 pass to function. 
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //we have to check if the user clicked all buttons. 
        //console.log("success!");
        if(userClickedPattern.length === gamePattern.length){
            //we will go to the new set of sequence
            //Case when its correct and all the buttons have been chosen, 
            //we will call the function for the new sequence. 
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        //console.log("wrong!");
        var wrong_audio = new Audio("sounds/wrong.mp3"); 
        wrong_audio.play(); 
        //select the body and apply the css style. 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver(); 
    }
}

function nextSequence(){
    //increment level first. 
    userClickedPattern=[]; 
    level+=1; 
    //now we have to change our heading as well. 
    $("#level-title").text("Level " + level); 

    randomNumber = Math.floor(Math.random()*4); //gerates till 3.999999999 and gets floored 
    randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    //we want to select the button with the same id as 'random chosen color'
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //we have to use javascript to play the sound of the selected color. 
    playSound(randomChosenColor); 
}

function playSound(name){
    switch (name) {
        case "red":
            var red_audio = new Audio("sounds/red.mp3"); 
            red_audio.play(); 
            break;

        case "yellow":
            var yellow_audio = new Audio("sounds/yellow.mp3"); 
            yellow_audio.play();
            break;

        case "green":
            var green_audio = new Audio("sounds/green.mp3"); 
            green_audio.play(); 
            break;

        case "blue":
            var blue_audio = new Audio("sounds/blue.mp3"); 
            blue_audio.play(); 
            break;

        default:
            break;
    }
}

function animatePress(currentColor){
    //we need to select the button by id and add a class. 
    $("#"+currentColor).addClass("pressed"); 
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0; 
    started = false; 
    gamePattern=[]; 
}




