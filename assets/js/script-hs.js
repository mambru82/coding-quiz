var existingScores=[];
var pageContentEl = document.querySelector("#page-content");
var scoreListEl = document.querySelector(".score-list")
var footerContentEl = document.querySelector("#footer-element");
var scoreKeepEl = document.querySelector("#score-content");
//Clears the scores
var clearScores = function() {
    localStorage.clear();
    //resets existing scores to an empty array
    existingScores = [];
    //saves the empty array (necessary in order to deal with saving scores after a reset)
    saveScores();
    return existingScores;
  }
var loadScores = function () {
    //loads the score submitted in the prior page
    var submittedScores = localStorage.getItem("scores");
    submittedScores = JSON.parse(submittedScores);
    //if existing high score is null, generates an empty array, otherwise parses the saved high-scores
    if (existingScores === null || existingScores === false || existingScores === []) {
    existingScores = [];
    } else {
    existingScores = localStorage.getItem("high-scores");
    existingScores = JSON.parse(existingScores);
    }
    existingScores.push(...submittedScores);
    console.log(existingScores);
    return existingScores;
    }

    //saves the scores to high-scores, clears the submitted scores (prevents duplication of scores in subsequent submissions)
var saveScores = function() {
        localStorage.setItem("high-scores", JSON.stringify(existingScores));
        localStorage.setItem("scores", "[]");
      }

      //renders the high scores 
var displayScores = function (event) {
    existingScores = loadScores();
    //sorts the scores from highest to lowest
    var sortedScores = existingScores.sort(function(a,b){return b.score - a.score});
    
    //renders the scores in an ordered list
    var highScoreEl = document.createElement("ol");
    //iterates through the scores and generates a list item for each one
    for (let i=0; i < sortedScores.length; i++) {
    var highScoreLog = document.createElement("li");
    highScoreLog.setAttribute("class", "score-list");
    highScoreLog.textContent = sortedScores[i].initials + " - " + sortedScores[i].score;
    
    highScoreEl.appendChild(highScoreLog);
    }
  
    scoreListEl.appendChild(highScoreEl);
  
    }

    //distinguishes between the go back button and the reset scores button
var taskButtonHandler = function(event) {
        //get target element from event
        var targetEl = event.target;
        //if go back is clicked
        if (targetEl.matches(".go-back")) {
          saveScores();
          window.location.href = "../../index.html";
        }
        //if reset scores is clicked
        else if (targetEl.matches(".resetter")) {
          clearScores();
          scoreListEl.remove();
          loadScores();
        }
    };
displayScores();
pageContentEl.addEventListener("click", taskButtonHandler);
window.addEventListener("load", loadScores);