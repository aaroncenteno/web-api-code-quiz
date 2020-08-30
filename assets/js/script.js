var highScoreLinkEl = document.getElementById("current-high-scores");
var openingPageEl = document.getElementById("opening-page");
var btnStartEl = document.getElementById("#start-quiz");
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

