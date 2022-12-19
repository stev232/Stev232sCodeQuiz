var scoreBoard = JSON.parse(localStorage.getItem("highScores"));
if(scoreBoard==null) {
    scoreBoard = [["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"]];
}

var isComplete = false;
var timer = 60;
var score = 0;
var answerOrder = [];
var isUnique = true;
var questionOrder = [];
var questionNum;
var userInitials;

/* Declare constants */
/* These are all different html elements */
const timeEl = document.getElementById("timer");
const initials = document.getElementById("initials");
const submitInitials = document.getElementById("submitInitials");
const scoreReview = document.getElementById("prompt");
const displayScore = document.getElementById("displayScore");
const resetScores = document.getElementById("scoreReset");
const startQuiz = document.getElementById("startQuiz");
const question = document.getElementById("questionContainer");
const answerOne = document.getElementById("answerOne");
const answerTwo = document.getElementById("answerTwo");
const answerThree = document.getElementById("answerThree");
const answerFour = document.getElementById("answerFour");
const liEl = ["firstPlace", "secondPlace", "thirdPlace", "fourthPlace","fifthPlace",
                "sixthPlace", "seventhPlace", "eighthPlace", "ninethPlace", "tenthPlace"];

const arrQuestions = ["What is  the statement to set a border radius in css?", "What command do you use to link a style sheet?", "Which of these elements is an being referenced in CSS by id?", 
        "Which of these elements is an being referenced in CSS by class?", "How do you call item 3 from an array", "How do you display a variable with a String of text", ];
const arrAnswers = [["border-radius", "borderRadius", "border_radius", "border.radius"], 
        ['<link rel="stylesheet" href="./assets/css/style.css" />', '<a href="./assets/css/style.css" rel="stylesheet"> ', '<stylesheet path="./assets/css/style.css" />',
        '<link rel="./assets/css/style.css" href="stylesheet" />'],
        ['#name', '.name', '/name', 'name'],
        ['.name', '#name', '/name', 'name'],
        ['name[2]', 'name[3]', 'name<2>', 'name<3>'],
        ['.textContent = variable + " a String of text";' , '.textContent = variable * " a String of text";', '.textContent = variable - " a String of text";' , 
        '.textContent = variable "a String of text";'], ];

/* display top 10 scores */

function generateScoreBoard() {
    if(scoreBoard != null && scoreBoard[0][1] != 0){
        for(var i = 0; i < scoreBoard.length; i++) {
            if(scoreBoard[i][1] == 0) {
                break;
            } else {
                document.getElementById(liEl[i]).textContent  = scoreBoard[i][0] + ": " +scoreBoard[i][1];
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
        if(score > scoreBoard[i][1]) {
            for(var x = 9; x > i; x--) {
                scoreBoard[x][0] = scoreBoard[x-1][0];
                scoreBoard[x][1] = scoreBoard[x-1][1];
            }
            scoreBoard[i][0] = userInitials;
            scoreBoard[i][1] = score;
            break;
        }
    }
    localStorage.setItem("highScores", JSON.stringify(scoreBoard));
    generateScoreBoard();
}

/* start quiz */

function startTime() {
    questionRand();
    generateQuestion();

    var timerInterval = setInterval(function() {
        timeEl.textContent = timer;
  
        if(isComplete) {
            score = timer;
            question.style.display="none";
            answerOne.style.display="none";
            answerTwo.style.display="none";
            answerThree.style.display="none";
            answerFour.style.display="none";
            scoreReview.style.display="block";
            displayScore.textContent=score;
            clearInterval(timerInterval);
        } else if(timer === 0) {
            score = timer;
            question.style.display="none";
            answerOne.style.display="none";
            answerTwo.style.display="none";
            answerThree.style.display="none";
            answerFour.style.display="none";
            scoreReview.style.display="block";
            clearInterval(timerInterval);
        }
        timer--;
    }, 1000);
}

/* place text in h1 and answer buttons */

function generateQuestion() {
    answerRand();
    question.textContent = arrQuestions[questionOrder[questionNum]];
    answerOne.textContent = arrAnswers[questionOrder[questionNum]][answerOrder[0]];
    answerTwo.textContent = arrAnswers[questionOrder[questionNum]][answerOrder[1]];
    answerThree.textContent = arrAnswers[questionOrder[questionNum]][answerOrder[2]];
    answerFour.textContent = arrAnswers[questionOrder[questionNum]][answerOrder[3]];
}

function questionRand() {
    for(var i = 0; i < arrQuestions.length; i++) {
        holder = Math.floor(Math.random() * arrQuestions.length);
        for(var x = 0; x < i; x++) {
            if(questionOrder[x] === holder) {
                isUnique = false;
            }
        }
        if(isUnique) {
            questionOrder[i] = holder;
        } else {
            isUnique = true;
            i -= 1;
        }

    }
    holder = "";
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
    holder = "";
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
    scoreBoard = [["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"], ["", "0"]];
    localStorage.setItem("highScores", JSON.stringify(scoreBoard));
    generateScoreBoard();
});

startQuiz.addEventListener("click", function() {
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

submitInitials.addEventListener("click", function() {
    userInitials = initials.value;

    saveScore();
    scoreReview.style.display="none";
    startQuiz.style.display="block";
});