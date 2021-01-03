var existingScores=[];
var pageContentEl = document.querySelector("#page-content");
var footerContentEl = document.querySelector("#footer-element");
var scoreKeepEl = document.querySelector("#score-content");
var clearScores = function() {
    localStorage.clear();
    existingScores = [];
    saveScores();
    console.log("trying to reset");
    return existingScores;
  }
var loadScores = function () {
    var submittedScores = localStorage.getItem("scores");
    submittedScores = JSON.parse(submittedScores);
    
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
var saveScores = function() {
        localStorage.setItem("high-scores", JSON.stringify(existingScores));
        localStorage.setItem("scores", "[]");
      }

var displayScores = function (event) {
    existingScores = loadScores();
    var sortedScores = existingScores.sort(function(a,b){return b.score - a.score});
       
    var highScoreEl = document.createElement("ol");
    
    for (let i=0; i < sortedScores.length; i++) {
    var highScoreLog = document.createElement("li");
    highScoreLog.setAttribute("class", "score-list");
    highScoreLog.textContent = sortedScores[i].initials + " - " + sortedScores[i].score;
    
    highScoreEl.appendChild(highScoreLog);
    }
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "btn go-back");
    goBackButton.textContent = "Go Back";
    
    var resetButton = document.createElement("button");
    resetButton.setAttribute("class", "btn resetter");
    resetButton.textContent = "Reset";
    
    pageContentEl.appendChild(highScoreEl);
    pageContentEl.appendChild(goBackButton);
    pageContentEl.appendChild(resetButton);
  
    }
var taskButtonHandler = function(event) {
        //get target element from event
        var targetEl = event.target;
        //if an answer choice was clicked
        if (targetEl.matches(".go-back")) {
          saveScores();
          window.location.href = "../../index.html";
        }
        else if (targetEl.matches(".resetter")) {
          clearScores();
        }
    };
displayScores();
pageContentEl.addEventListener("click", taskButtonHandler);
scoreKeepEl.addEventListener("click", displayScores);
window.addEventListener("load", loadScores);