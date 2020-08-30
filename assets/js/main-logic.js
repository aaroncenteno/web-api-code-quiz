    // element variables
    var questionDivEl = document.getElementById("question-div");
    var openingPageEl = document.getElementById("opening-page");
    var endPageEl = document.getElementById("end-page");
    var playerScoreEl = document.getElementById("player-score");
    var formInitialsEl = document.getElementById("initials-score");
    var highScoresEl = document.getElementById("high-scores-div");
    var highScoreLinkEl = document.getElementById("current-high-scores");
    var highScoreListEl = document.getElementById("high-score-list");
    var correctEl = document.getElementById("correct");
    var incorrectEl = document.getElementById("incorrect");

    //buttons
    var btnStartEl = document.querySelector("#start-quiz");
    var btnReturnEl = document.querySelector("#return");

    //questions/answers element
    var questionEl = document.getElementById("current-question");
    var answerSelectionEl = document.getElementById("answer-selection");
    var timerEl = document.querySelector("#timer");
    var score = 0;
    var timeleft;
    var gameover;
    timerEl.innerText = 0;

    //High Score Array
    var highScores = [];

    //assign array details for questions 
    var arrayShuffleQuestions;
    var questionIndex = 0;

    //     if go back button is hit on high score page
    var goToStartPage = function () {
        highScoresEl.classList.add("hide");
        highScoresEl.classList.remove("show");
        openingPageEl.classList.remove("hide");
        openingPageEl.classList.add("show");
        playerScoreEl.removeChild(playerScoreEl.lastChild);
        questionIndex = 0;
        gameover = "";
        timerEl.textContent = 0 ;
        score = 0;

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }
        if (incorrectEl.className = "show") {
            incorrectEl.classList.remove("show");
            incorrectEl.classList.add("hide");
        }
    }

    // every second, check if game-over is true, or if there is time left. Start time at 30. 
    var setTime = function () {
        timeleft = 30;

        var timercheck = setInterval(function() {
            timerEl.innerText = timeleft;
            timeleft--;

            if (gameover) {
                clearInterval(timercheck);
            }
        
            if (timeleft < 0) {
                showScore();
                timerEl.innerText = 0;
                clearInterval(timercheck);
            }

        }, 1000)
    };

    var startQuiz = function() {
        //add classes to show/hide start and quiz screen
        openingPageEl.classList.add('hide');
        openingPageEl.classList.remove('show');
        questionDivEl.classList.remove('hide');
        questionDivEl.classList.add('show');
        //Shuffle the questions so they show in random order
        arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        loadQuestion()
    };
    
    // set next question for quiz
    var loadQuestion = function() {
        resetAnswers();
        showQuestion(arrayShuffleQuestions[questionIndex]);
    };

    // remove answer buttons
    var resetAnswers = function() {
        while (answerSelectionEl.firstChild) {
            answerSelectionEl.removeChild(answerSelectionEl.firstChild)
        };
    };

    //display question information (including answer buttons)
    var showQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerSelect = document.createElement('button');
            answerSelect.innerText = index.choices[i].choice;
            answerSelect.classList.add('btn');
            answerSelect.classList.add('answerbtn');
            answerSelect.addEventListener("click", checkAnswer);
            answerSelectionEl.appendChild(answerSelect);
        }
    };

    // Show Correct Notification on Screen
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide");
            correctEl.classList.add("right-wrong");
            incorrectEl.classList.remove("right-wrong");
            incorrectEl.classList.add("hide");
        }
    };

    // Show incorrect Notification on screen
    var answerIncorrect = function() {
        if (incorrectEl.className = "hide") {
            incorrectEl.classList.remove("hide");
            incorrectEl.classList.add("right-wrong");
            correctEl.classList.remove("right-wrong");
            correctEl.classList.add("hide");
        }
    };

    // check to see if the players choice is correct/incorrect
    var checkAnswer = function(event) {
        var selectedAnswer = event.target
            if (arrayShuffleQuestions[questionIndex].a === selectedAnswer.innerText){
                answerCorrect();
                score = score + 5;
            }
            else {
                answerIncorrect()
                score = score - 2;
                timeleft = timeleft - 10;
            }

            // Check if there is another question and if there is load it
            questionIndex++
            if (arrayShuffleQuestions.length > questionIndex + 1) {
                loadQuestion();
            }
            else {
                gameover = "true";
                showScore ();
            }
    }

    // show the players total score at the end of the quiz
    var showScore = function () {
        questionDivEl.classList.add("hide");
        endPageEl.classList.remove("hide");
        endPageEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        playerScoreEl.appendChild(scoreDisplay);
    };
    
    //on start click, start game
    btnStartEl.addEventListener("click", startQuiz);
    //Go back button
    btnReturnEl.addEventListener("click", goToStartPage);
