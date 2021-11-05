//alert("isto ser teste");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);

    $("#title").html("Level " + level);
    level++;

    cowPop();
};

//sound;
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

//user-click animation;
function animatePress(currentColour){
    //animation
    $(".btn").click(function(){
        var cock = $(this);    //selects button;
        cock.addClass("pressed");

    //animation END
    var timeInMS = 100;
    setTimeout(function () {
        cock.removeClass("pressed");
    }, timeInMS);
    });
};

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);    //USER click = sound;
    checkAnswer(userClickedPattern.length -1); //checks if click is correct;

});

var level = 0;

$("body").keydown((event) => {
    if (event.key == "e"){
        if (level === 0){
            nextSequence();
            animatePress();
            $("#title").html("Level " + level);
            $("#bottom-title").hide();
            $("h1").css({"margin-bottom": "42px"});
        }
    }
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("👍");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000); 
        }
    }
    else{
        console.log("👎");
        playSound("wrong");

        $("h1").html("🟩🟥 GGs 🟨🟦");
        $("h1").css({"margin-bottom": "0px"});
        $("#bottom-title").show().html("press E to restart.");

        $("body").addClass("lolnoob");
        setTimeout(function () {
            $("body").removeClass("lolnoob");
        }, 200);

        restart();
    }
};

var timesPlayed = 0;

function restart(){
    level = 0;
    gamePattern = [];
    timesPlayed++;
};

//cow event is being handled by #moo instead of .funnycow because .funnycow is acting up like a cunt idk why
function cowPop(){
    if (level === 3){ //will pop at level 8
        setTimeout(() => {
            $("#moo").css({"visibility": "visible"});
            playSound("secretcow");
        }, 100);

        setTimeout(() => {
            $("#yo").css({"visibility": "visible"});
        }, 500);
        
        setTimeout(() => {
           $("#yo").css({"visibility": "hidden"}); 
        }, 1000);

        setTimeout(() => {
            $("#moo").hover(() => {
                $("#click-me").css({"visibility": "visible"});
            }, () => {
                $("#click-me").css({"visibility": "hidden"});
            }) 
        }, 200);

    }
}

$("#moo").click(() => {
    $("#click-me").hide();
    
    $("#moo").css({"visibility": "hidden"});
    setTimeout(() => {
        playSound("barnyard"); 
    }, 150);

    setTimeout(() => {
        $("#moo").fadeOut(100);
    }, 900);

    setTimeout(() => {
        $("#moo2").css({"visibility": "visible"});
    }, 1100);
    
    cowDance();
}); //has to be a click because of the autoplay law... cringe

function cowDance(){
    setTimeout(() => {
        $("#moo2").css({"transform": "rotate(20deg)"});
    }, 2000);
    setTimeout(() => {
        $("#moo2").css({"transform": "rotate(340deg)"});
    }, 3000);
    setTimeout(() => {
        $("#moo2").css({"transform": "rotate(0deg)"});
    }, 4000);
    setTimeout(() => {
        $("#bye").css({"visibility": "visible"});
    }, 4300);
    setTimeout(() => {
        $("#moo2").fadeOut(100);
        $("#bye").fadeOut(100);
    }, 6000);
}