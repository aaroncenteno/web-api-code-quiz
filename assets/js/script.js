var highScoreLinkEl = document.getElementById("current-high-scores");
var openingPageEl = document.getElementById("opening-page");
var btnStartEl = document.querySelector("#start-quiz");
var questionDivEl = document.getElementById("question-div");
var questionEl = document.getElementById("current-question");
var answerSelectionEl = document.getElementById("answer-selection");
var endPageEl = document.getElementById("end-page");
var playerScoreEl = document.getElementById("player-score");
var formInitialsEl = document.getElementById("initials-score");
var highScoresEl = document.getElementById("high-scores-div");
var highScoreListEl = document.getElementById("high-score-list");
var btnReturnEl = document.querySelector("#return");
var correctEl = document.getElementById("correct");
var incorrectEl = document.getElementById("incorrect");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerEl.innerText = 0;
// High Scores
var highScores = [];

var arrayShuffleQuestions;
var questionIndex = 0;


// Questions Array
var questions = [
    { q: 'Commonly used data types do not include _______.',
      a: '4. alerts',
      choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
    },
    { q: 'The condition of an if/else statement is enclosed with ________.',
      a: '2. curly brackets',
      choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. paranthesis'}, {choice: '4. square brackets'}]
    },
    { q: 'Arrays in JavaScript can be used to store ________.',
      a: '4. all of the above',
      choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}]
    },
    { q: 'String values must be enclosed within ________ when being assigned to variables.',
      a: '3. quotes',
      choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. paranthesis'}]
    },
    { q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      a: '4. console.log',
      choices: [{choice: '1. JavaScript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console.log'}]
    }
];

// if return to quiz button is hit on high score page
var goToStartPage = function () {
    highScoresEl.classList.add("hide");
    highScoresEl.classList.remove("show");
    openingPageEl.classList.remove("hide");
    openingPageEl.classList.add("show");
    playerScoreEl.removeChild(playerScoreEl.lastChild);
    questionIndex = 0;
    gameover = "";
    timerEl.textContent = 0;
    score= 0;

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (incorrectEl.className = "show") {
        incorrectEl.classList.remove("show");
        incorrectEl.classList.add("hide");
    }
};

var setTime = function () {
    timeleft = 30;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }

    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }
    }, 1000)
}

// Start Quiz Function
var startQuiz = function () {
    // show/hide classes
    openingPageEl.classList.add('hide');
    openingPageEl.classList.remove('show');
    questionDivEl.classList.remove('hide');
    questionDivEl.classList.add('show');
    // Question Shuffler
    arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    loadQuestion()
}

var loadQuestion = function (){
    resetAnswers()
    showQuestion(arrayShuffleQuestions,[questionIndex])
}

var resetAnswers = function() {
    while (answerSelectionEl.firstChild) {
        answerSelectionEl.removeChild(answerSelectionEl.firstChild)
    };
};

// display current question
var showQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerSelect = document.createElement('button')
        answerSelect.innerText = index.choises[i].choice
        answerSelect.classList.add('btn')
        answerSelect.classList.add('answerbtn')
        answerSelect.addEventListener("click", answerCheck)
        answerSelectionEl.appendChild(answerSelect)
    }
};

// on start click, begin the quiz
btnStartEl.addEventListener("click", startQuiz)
// Return to Quiz from high scores
btnReturnEl.addEventListener("click", goToStartPage)
