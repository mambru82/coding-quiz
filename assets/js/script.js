//Quiz questions and answers in an object oriented format
var quizArray = [{
  questionNumber: 1,
  questionTxt: "A for loop is often used for the purposes of:",
  answerChoices: ["Iterating through a string of values", 
  "For forring your forest", "Flipping burgers"],
  answerKey: [true, false, false],
},
{
  questionNumber: 2,
  questionTxt: "The main difference between a for loop and a while loop is:",
  answerChoices: ["one fors, one whiles", "one sets an incremental loop, the other sets a loop with a fixed condition", "Your momma"],
  answerKey: [false, true, false]
},
{
  questionNumber: 3,
  questionTxt: "Happy now?",
  answerChoices: ["no", "yes"],
  answerKey: [false, true]
}]

// END OF QUIZ


var highScores = [];
var questionStatus=0;
var timeRemaining=65;
var quizScore = 0;
var pageContentEl = document.querySelector("#page-content");
var footerContentEl = document.querySelector("#footer-element");
var scoreKeepEl = document.querySelector("#score-content");

//var renderHeader = function() {
//renders the timer element 
var timeRemainingEl = document.createElement("div");
timeRemainingEl.setAttribute("text-align", "right");
timeRemainingEl.setAttribute("class", "time-remaining");

//renders the button to the high scores
var highScoreEl = document.createElement("div");
highScoreEl.setAttribute("class", " high-score");
highScoreEl.innerHTML= "<a href='./assets/html/highscores.html'> View High Scores </a>"

scoreKeepEl.appendChild(highScoreEl);
scoreKeepEl.appendChild(timeRemainingEl);
//}



var saveScores = function() {
  localStorage.setItem("scores", JSON.stringify(highScores));
}

var clearScores = function() {
  localStorage.clear("scores");
  highScores = [];
  console.log("trying to reset");
  return highScores;
}

var highScoreSubmit = function(event) {
  //event.preventDefault();
  var highScoreInput = {
    initials: document.querySelector("input[name='initials']").value,
    score: quizScore};
  highScores.push(highScoreInput);
  saveScores();
  console.log(highScoreInput, highScores);
}

//Function renders initial screen with start button
var codingQuizStart = function(event) {
 // renderHeader();
  var quizStartContainerEl = document.createElement("div");
  quizStartContainerEl.className = "starting-page";
  quizStartContainerEl.innerHTML = "<h1 class='welcome-page'> Coding Quiz Challenge </h1> <p class='welcome-content'> Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p>";
  var startButtonEl = document.createElement("button");
  startButtonEl.className = "btn start-button";
  startButtonEl.textContent = "Start Quiz";

  quizStartContainerEl.appendChild(startButtonEl);
  pageContentEl.appendChild(quizStartContainerEl);
}
//Function renders end of quiz screen with form submission
var createFinalScore = function(event) {
  var quizEndContainerEl = document.createElement ("div");
  quizEndContainerEl.className = "end-screen";
  quizEndContainerEl.innerHTML = "<h1 class='end-page'>All done! </h1> <p class='end-content'>Your final score is " + quizScore + ". </p>";
  var highScorePromptEl = document.createElement("div");
  highScorePromptEl.setAttribute("class", "form-wrapper form-group");
  highScorePromptEl.innerHTML="<p>Enter Initials!</p>";
  var highScoreFormEl = document.createElement ("form");
  highScoreFormEl.setAttribute("class", "form-input");
  highScoreFormEl.setAttribute("id", "task-form");
  highScoreFormEl.innerHTML = "<input type='text' name='initials' placeholder='Enter your initials!'/>";
  var scoreSubmitBtnEl = document.createElement ("button");
  scoreSubmitBtnEl.setAttribute("class", "btn submit");
  scoreSubmitBtnEl.setAttribute("type", "submit");
  scoreSubmitBtnEl.textContent = "Submit";
  highScorePromptEl.appendChild(highScoreFormEl);
  highScorePromptEl.appendChild(scoreSubmitBtnEl);
  quizEndContainerEl.appendChild(highScorePromptEl);
  console.log(quizEndContainerEl);
  pageContentEl.appendChild(quizEndContainerEl);
}
//Quiz functionality
  //Array of possible answers is presented as buttons 
var createQuizQuestion = function(questionStatus){
  if (questionStatus===0 || questionStatus >=quizArray.length) {
  questionStatus = 0;
  timeRemaining = 65;
  var clearStart = document.querySelector(".starting-page"); 
  clearStart.remove();
  }

  var questionContainerEl = document.createElement("div");
  questionContainerEl.className = "quiz-question";
  questionContainerEl.setAttribute("id", questionStatus);

  // render quiz question
  questionContainerEl.innerHTML = "<h3 class='question-text'>" +  quizArray[questionStatus].questionNumber + ". " + quizArray[questionStatus].questionTxt + "</h3>";

  // render answer choices
  var answerChoiceContainerEl = document.createElement("ul");

  for (var i=0; i < quizArray[questionStatus].answerChoices.length; i++) {
  var answerChoiceEl = document.createElement("li");
  var answerButtonEl = document.createElement("button");
  answerButtonEl.textContent = (i+1) + ". " + quizArray[questionStatus].answerChoices[i];
  answerButtonEl.className = "btn answer-choice";
  answerButtonEl.setAttribute("data-id", i);
  answerChoiceEl.appendChild(answerButtonEl);
  answerChoiceContainerEl.appendChild(answerChoiceEl);
  }
  questionContainerEl.appendChild(answerChoiceContainerEl);
  pageContentEl.appendChild(questionContainerEl);}

//countdown function
var countdown = function(){
  var timeInterval = setInterval(function() {
    if (timeRemaining === 0 && questionStatus < quizArray.length){
      clearInterval(timeInterval);
      timeRemaining = 0;
      timeRemainingEl.textContent = "Time remaining: " + timeRemaining;
      var questionClear = document.querySelector(".quiz-question");
      questionClear.remove();
      createFinalScore();
    }
    else if (timeRemaining<=0 || questionStatus===quizArray.length){
    clearInterval(timeInterval);
    timeRemaining = 0;
    timeRemainingEl.textContent = "Time remaining: " + timeRemaining;
 //   var questionClear = document.querySelector(".quiz-question");
 //   questionClear.remove();
    createFinalScore();
    } else {
    console.log(timeRemaining);
    timeRemainingEl.textContent = "Time remaining: " + timeRemaining;
    timeRemaining--;
    }
    }, 1000);}
//task button handler will determine what happens with a click
//CONSIDER using a switch for the taskButton a switch 
var taskButtonHandler = function(event) {
  //get target element from event
  var targetEl = event.target;
  //if an answer choice was clicked
  if (targetEl.matches(".answer-choice")){
    //clears previous question and answer
   var questionClear = document.querySelector(".quiz-question");
   questionClear.remove();
   checkAnswerChoice(targetEl);
  }
  else if (targetEl.matches(".start-button")) {
  questionStatus = 0;
  timeRemaining = 65;
  quizScore = 0;
  createQuizQuestion(questionStatus); 
  countdown();
  } 
  else if (targetEl.matches(".submit")) {
    highScoreSubmit();
    window.location.href = "./assets/html/highscores.html";
  }
  else if (targetEl.matches(".go-back")) {
    codingQuizStart();
  }
  else if (targetEl.matches(".resetter")) {
    clearScores();
  }
};
var checkAnswerChoice = function(targetEl) {
 //checks to see if there's a previous correct/incorrect answer present, clears the previous answer check
  if (questionStatus>0) {
   var answerClear = document.querySelector(".answer-status");
   answerClear.remove();
  }
  var answerId = targetEl.getAttribute("data-id");
  console.log(answerId);
  //clear question
  //var questionClear = document.querySelector(".quiz-question[id='" + questionStatus + "']");
    if (quizArray[questionStatus].answerKey[answerId]===true) {
   //create the answer message if correct
    createAnswerCheck("Correct!");
    //adds point for correct answer
    quizScore++;
  } else {
    //create the answer message if incorrect
    createAnswerCheck("Wrong!");
    //subtracts 
    timeRemaining -=10;
  }
  questionStatus++;
  if (questionStatus < quizArray.length && timeRemaining>0) {
  createQuizQuestion(questionStatus);}

}

var createAnswerCheck = function(string) {
  var answerResultEl = document.createElement("div");
  answerResultEl.setAttribute ("class", "answer-status");
  answerResultEl.setAttribute ("id", questionStatus);
  answerResultEl.textContent = string;
  footerContentEl.appendChild(answerResultEl);
}

  //compare the answer choice to answer key
  //if answer key is true
    //add answer to score
  //if answer key is false
    //subtract time
    //move on to next question



  //When the correct button is pressed, the user is told it is correct and the quiz moves on
    //Correct answer is added to correct tally

  //when the incorrect button is pressed, the user is told it is incorrect and the quiz moves on
    //the timer decreases

//When either questions left or timer equals 0, quiz ends
  //when timer ends, endOfQuiz function is initiated

//User inputs their initials
//Their score is saved to local storage 


codingQuizStart();
pageContentEl.addEventListener("click", taskButtonHandler);
//window.addEventListener("load", loadScores);

