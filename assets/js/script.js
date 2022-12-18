var scoreBoard = JSON.parse(localStorage.getItem("highScores"));
if(scoreBoard==null) {
    scoreBoard = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
}
var isComplete = false;
var timer = 60;
var score = 0;

const timeEl = document.getElementById("timer");
const liEl = ["firstPlace", "secondPlace", "thirdPlace", "fourthPlace","fifthPlace",
                "sixthPlace", "seventhPlace", "eighthPlace", "ninethPlace", "tenthPlace"];

const arrQuestions = ["What is  the statement to set a border radius in css?", "What command do you use to link a style sheet?" ];
const arrAnswers = [["border-radius", "borderRadius", "border_radius", "border.radius"], 
        ['<link rel="stylesheet" href="./assets/css/style.css" />', '<a href="./assets/css/style.css" rel="stylesheet"> ', '<stylesheet path="./assets/css/style.css" />', '<link rel="./assets/css/style.css" href="stylesheet" />'], ];
const startQuiz = document.getElementById("startQuiz");
const question = document.getElementById("questionContainer");
const answerOne = document.getElementById("answerOne");
const answerTwo = document.getElementById("answerTwo");
const answerThree = document.getElementById("answerThree");
const answerFour = document.getElementById("answerFour");

function generateScoreBoard() {
    if(scoreBoard != null && scoreBoard[0] != 0){
        for(var i = 0; i < scoreBoard.length; i++) {
            if(scoreBoard[i] == 0) {
                break;
            } else {
                document.getElementById(liEl[i]).textContent  = scoreBoard[i];
            }
        }
    }
}

function saveScore() {
    for(var i = 0; i < scoreBoard.length; i++) {
        if(score > scoreBoard[i]) {
            for(var x = 9; x > i; x--) {
                scoreBoard[x] = scoreBoard[x-1];
            }
            scoreBoard[i] = score;
            break;
        }
    }
    localStorage.setItem("highScores", JSON.stringify(scoreBoard));
    generateScoreBoard();
}

startQuiz.addEventListener("click", function() {
    isComplete = false;
    timer = 60;

    question.style.display="block";
    answerOne.style.display="block";
    answerTwo.style.display="block";
    answerThree.style.display="block";
    answerFour.style.display="block";
    startQuiz.style.display="none";

    startTime();
});

function startTime() {

    question.textContent = arrQuestions[0];
    answerOne.textContent = arrAnswers[0][0];
    answerTwo.textContent = arrAnswers[0][1];
    answerThree.textContent = arrAnswers[0][2];
    answerFour.textContent = arrAnswers[0][3];

    answerOne.addEventListener("click", function() {
        isComplete = true;
    });

    answerTwo.addEventListener("click", function() {

    });

    answerThree.addEventListener("click", function() {

    });

    answerFour.addEventListener("click", function() {

    });
    
    var timerInterval = setInterval(function() {
        timer--;
        timeEl.textContent = timer;
  
        if(isComplete) {
            score = timer;
            question.style.display="none";
            answerOne.style.display="none";
            answerTwo.style.display="none";
            answerThree.style.display="none";
            answerFour.style.display="none";
            startQuiz.style.display="block";
            saveScore();
            clearInterval(timerInterval);
        } else if(timer === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

generateScoreBoard();