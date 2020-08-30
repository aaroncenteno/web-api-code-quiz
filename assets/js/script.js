var highScoreLinkEl = document.getElementById("current-high-scores");
var openingPageEl = document.getElementById("opening-page");
var btnStartEl = document.getElementById("#start-quiz");
var questionDivEl = document.getElementById("question-div");
var questionEl = document.getElementById("current-question");
var answersEl = document.getElementById("answer-selection");
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

var highScores = [];

var arrayShuffleQuestions;
var questionIndex = 0;