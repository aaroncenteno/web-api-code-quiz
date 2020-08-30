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


    
    //   The array of questions for our quiz game.
      var questions = [
        { q: 'Commonly used data types do not include __________.', 
          a: '3. alerts', 
          choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
        },
        { q: 'The condition of an if/else statement is enclosed with ________', 
          a: '2. curly brackets', 
          choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. paranthesis'}, {choice: '4. square brackets'}]
        },
        { q: 'Arrays in JavaScript can be used to store ________.', 
          a: '4. all of the above', 
          choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}]
        },
        { q: 'Strings values must be enclosed within _________ when being assigned to variables', 
          a: '3. quotes', 
          choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. paranthesis'}]
        },
        { q: 'A very useful tool used during the development and debuggin for printing content to the debugger is: ', 
          a: '4. console.log', 
          choices: [{choice: '1. JavaScript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console.log'}]
        },
      ];
      
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

    var storeHighScore = function(event) {
        event.preventDefault()
        var initials = document.querySelector("#initials").value;
        if (!initials) {
            alert("Please enter your initials to store your high score!");
            return;
        }

        formInitialsEl.reset();

        var highScore = {
            initials: initials,
            score: score
        }

        highScores.push(highScore);
        highScores.sort((a, b) => {return b.score-a.score});

        while (highScoreListEl.firstChild) {
            highScoreListEl.removeChild(highScoreListEl.firstChild)
        }

        for (var i = 0; i < highScores.length; i++) {
            var highScoreEl = document.createElement("li");
            highScoreEl.className = "high-score";
            highScoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
            highScoreListEl.appendChild(highScoreEl);
        }

        savePlayerScore();

    }

    var savePlayerScore = function () {
        localStorage.setItem("highScores", JSON.stringify(highScores))
    }

    var loadHighScore = function () {
        var allHighScores = localStorage.getItem("highScores")
            if (!allHighScores) {
                return false;
            }

        allHighScores = JSON.parse(allHighScores);
        allHighScores.sort((a, b) => {return b.score-a.score})

        for (var i = 0; i < allHighScores.length; i++) {
            var highScoreEl = document.createElement("li");
            highScoreEl.className = "high-score";
            highScoreEl.innerText = allHighScores[i].initials + " - " + allHighScores[i].score;
            highScoreListEl.appendChild(highScoreEl);

            highScores.push(allHighScores[i]);
        }
    }

    var displayHighScores = function() {

        highScoresEl.classList.remove("hide");
        highScoresEl.classList.add("show");
        gameover = "true"

        if (endPageEl.className = "show") {
            endPageEl.classList.remove("show");
            endPageEl.classList.add("hide");
        }
        if (openingPageEl.className = "show") {
            openingPageEl.classList.remove("show");
            openingPageEl.classList.add("hide");
        }
        if (questionDivEl.className = "show") {
            questionDivEl.classList.remove("show");
            questionDivEl.classList.add("hide");
        }
        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }
        if (incorrectEl.className = "show") {
            incorrectEl.classList.remove("show");
            incorrectEl.classList.add("hide");
        }
    }
    
    loadHighScore();

    
    //on start click, start game
    btnStartEl.addEventListener("click", startQuiz);
    //Go back button
    btnReturnEl.addEventListener("click", goToStartPage);
