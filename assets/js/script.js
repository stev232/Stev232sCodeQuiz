var scoreBoard = JSON.parse(localStorage.getItem("highScores"));
if(scoreBoard==null) {
    scoreBoard = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
}

var isComplete = false;
var timer = 60;
var score = 0;
var answerOrder = [];
var isUnique = true;
var questionNum;

/* Declare constants */
/* These are all different html elements */
const timeEl = document.getElementById("timer");
const resetScores = document.getElementById("scoreReset");
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

/* display top 10 scores */

function generateScoreBoard() {
    if(scoreBoard != null && scoreBoard[0] != 0){
        for(var i = 0; i < scoreBoard.length; i++) {
            if(scoreBoard[i] == 0) {
                break;
            } else {
                document.getElementById(liEl[i]).textContent  = scoreBoard[i];
            }
        }
    } else {
        for(var i = 0; i < liEl.length; i++) {
            document.getElementById(liEl[i]).textContent  = "";
        }

    }
}

generateScoreBoard();

/* save scores in local storage */

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

/* start quiz */

function startTime() {
    generateQuestion();

    var timerInterval = setInterval(function() {
        timeEl.textContent = timer;
        console.log("isComplete: " + isComplete);
        console.log("questionNum: " + questionNum);
        console.log(timer);
  
        if(isComplete) {
            score = timer;
            question.style.display="none";
            answerOne.style.display="none";
            answerTwo.style.display="none";
            answerThree.style.display="none";
            answerFour.style.display="none";
            startQuiz.style.display="block";
            document.getElementById("quiz").setAttribute("flex-direction", "column");
            saveScore();
            clearInterval(timerInterval);
        } else if(timer === 0) {
            score = timer;
            question.style.display="none";
            answerOne.style.display="none";
            answerTwo.style.display="none";
            answerThree.style.display="none";
            answerFour.style.display="none";
            startQuiz.style.display="block";
            document.getElementById("quiz").setAttribute("flex-direction", "column");
            saveScore();
            clearInterval(timerInterval);
        }
        timer--;
    }, 1000);
}

/* place text in h1 and answer buttons */

function generateQuestion() {
    answerRand();
    question.textContent = arrQuestions[questionNum];
    answerOne.textContent = arrAnswers[questionNum][answerOrder[0]];
    answerTwo.textContent = arrAnswers[questionNum][answerOrder[1]];
    answerThree.textContent = arrAnswers[questionNum][answerOrder[2]];
    answerFour.textContent = arrAnswers[questionNum][answerOrder[3]];
}

/* randomize where the answers display */

function answerRand() {
    for(var i = 0; i < 4; i++) {
        holder = Math.floor(Math.random() * 4);
        for(var x = 0; x < i; x++) {
            if(answerOrder[x] === holder) {
                isUnique = false;
            }
        }
        if(isUnique) {
            answerOrder[i] = holder;
        } else {
            isUnique = true;
            i -= 1;
        }
    }
}

/* check if user input is correct */

function answerChecker(answerNum) {
    isComplete = false;
    if(answerOrder[answerNum] !== 0) {
        timer -= 10;
    }
    questionNum++;
    if(questionNum >= arrQuestions.length) {
        isComplete = true;
    } else {
        generateQuestion();
    }
}

/* Set event listeners */
resetScores.addEventListener("click", function() {
    scoreBoard = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    localStorage.setItem("highScores", JSON.stringify(scoreBoard));
    generateScoreBoard();
});

startQuiz.addEventListener("click", function() {
    document.getElementById("quiz").setAttribute("flex-direction", "row");
    isComplete = false;
    timer = 60;
    questionNum = 0;

    question.style.display="block";
    answerOne.style.display="block";
    answerTwo.style.display="block";
    answerThree.style.display="block";
    answerFour.style.display="block";
    startQuiz.style.display="none";

    startTime();
});

answerOne.addEventListener("click", function() {
    answerChecker(0);
});

answerTwo.addEventListener("click", function() {
    answerChecker(1);
});

answerThree.addEventListener("click", function() {
    answerChecker(2);
});

answerFour.addEventListener("click", function() {
    answerChecker(3);
});