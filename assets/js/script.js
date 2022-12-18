/*localStorage.getItem("highScores");
localStorage.setItem("highScores", arrScore);*/
var scoreBoard = localStorage.getItem("highScores");

var arrQuestions = ["What is  the statement to set a border radius in css?", ];
var arrAnswers = [["border-radius", "borderRadius", "border_radius", "border.radius"], ];

var startQuiz = document.getElementById("startBtn");
var question = document.getElementById("question");
var answerOne = document.getElementById("answerOne");
var answerTwo = document.getElementById("answerTwo");
var answerThree = document.getElementById("answerThree");
var answerFour = document.getElementById("answerFour");

startQuiz.addEventListener("click", function() {
    var score = startTime();
    if(scoreBoard==null) {
        scoreBoard = [0,0,0,0,0,0,0,0,0,0];
    }
    for(var i = 0; i < scoreBoard.length; i++) {
        if(score > scoreBoard[i]) {
            for(var x = 10; x > scoreBoard.length - i; x--) {
                scoreBoard[x] = scoreBoard[x-1];
            }
            scoreBoard[i] = score;
            exit;
        }
    }
    localStorage.setItem("highScores", scoreBoard);
});

function startTime() {
    var timer = 60;

    answerOne.addEventListener("click", function() {

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
            return timer;
        } else if(timer === 0) {
            return 0;
        }
    }, 1000);
  }