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
    displayHighScores();
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

// submit button event listener
formInitialsEl.addEventListener("submit", storeHighScore)
// When "High Scores!" button is clicked
highScoreLinkEl.addEventListener("click", displayHighScores)