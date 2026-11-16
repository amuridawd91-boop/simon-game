const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
const sounds = {
    red: new Audio("sounds/red.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    green: new Audio("sounds/green.mp3")
}


    let started = false;
    let level = 0;
    $(document).keydown(function(){
        if(!started){
            $('#level-title').text("Level 0");
            nextSequence();
            started = true
        }
        
    })

    
    

 $(".btn").click(function(){
        if (!started){
            return;
        }
        
        const userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour)
        
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1)
    })

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    const randomNumber = Math.floor((Math.random() * 4));
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
     
}

function playSound(colorId){
    if(sounds[colorId]){
        sounds[colorId].currentTime = 0;
        sounds[colorId].play();
    }
}

function animatePress(currentColour){
    $("#" + currentColour).addClass('pressed')
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
            userClickedPattern = [];
        }
    } else {
        
        const wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = []
}