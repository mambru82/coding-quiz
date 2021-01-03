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
  questionTxt: "Commonly used data types DO NOT include...",
  answerChoices: ["strings", "booleans", "alerts", "numbers"],
  answerKey: [false, false, true, false]
},
{
  questionNumber: 4,
  questionTxt: "The condition in an if/then statement is enclosed in:",
  answerChoices: ["commas", "curly brackets", "hugs", "parentheses", "square brackets"],
  answerKey: [false, false, false, true, false]
},
{
  questionNumber: 5,
  questionTxt: "Arrays in Javascript can be used to store:",
  answerChoices: ["objects", "numbers and strings", "booleans", "all of the above"],
  answerKey: [false, false, false, true]
},
{
  questionNumber: 6,
  questionTxt: "String values must be enclosed within ______ to be recognized as such by Javascript",
  answerChoices: ["parentheses", "curly brackets", "quotation marks", "exclamation points"],
  answerKey: [false, false, true, false] 
},
{
  questionNumber: 7,
  questionTxt: "A very useful tool during development for debugging and printing content is:",
  answerChoices: ["for loops", "if/then statements", "debugging consultants", "console.log", "terminal bash"],
  answerKey: [false, false, false, true, false]
}]

// END OF QUIZ

//initializes variables of interest
var highScores = [];
var questionStatus=0;
//sets time in seconds
var timeRemaining=65;
var quizScore = 0;

//queries DOM elements necessary to render the quiz
var pageContentEl = document.querySelector("#page-content");
var footerContentEl = document.querySelector("#footer-element");
var scoreKeepEl = document.querySelector("#score-content");


//renders the timer element 
var timeRemainingEl = document.createElement("div");
timeRemainingEl.setAttribute("text-align", "right");
timeRemainingEl.setAttribute("class", "time-remaining");

//renders the link to the high scores
var highScoreEl = document.createElement("div");
highScoreEl.setAttribute("class", " high-score");
//link to the High score html 
highScoreEl.innerHTML= "<a href='./assets/html/highscores.html'> View High Scores </a>"

scoreKeepEl.appendChild(highScoreEl);
scoreKeepEl.appendChild(timeRemainingEl);

//function to save a score to localStorage
var saveScores = function() {
  localStorage.setItem("scores", JSON.stringify(highScores));
}

//function to submit a score
var highScoreSubmit = function(event) {
  //prevents the form from automatically reloading upon submission
  event.preventDefault();
  //assigns the score and initials input to an object with initials and a score
  var highScoreInput = {
    initials: document.querySelector("input[name='initials']").value,
    score: quizScore};
  //pushes the high score input into an array (may not be necessary, used when the high score board was part of the index.html)
  highScores.push(highScoreInput);
  saveScores();
  console.log(highScoreInput, highScores);
  //redirects to the high score html
  window.location.href = "./assets/html/highscores.html";
}

//Function renders initial screen with start button
var codingQuizStart = function(event) {
  localStorage.setItem("scores", "[]");
  //localStorage.setItem("high-scores", "[]");
 // renderHeader();
  var quizStartContainerEl = document.createElement("div");
  quizStartContainerEl.className = "starting-page";
  //welcome message
  quizStartContainerEl.innerHTML = "<h1 class='welcome-page'> Coding Quiz Challenge </h1> <p class='welcome-content'> Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p>";
  //start button
  var startButtonEl = document.createElement("button");
  startButtonEl.className = "btn start-button";
  startButtonEl.textContent = "Start Quiz";
  //appends the button to the welcome message
  quizStartContainerEl.appendChild(startButtonEl);
  //appends the welcome message to the pagecontent
  pageContentEl.appendChild(quizStartContainerEl);
}
//Function renders end of quiz screen with form submission
var createFinalScore = function(event) {
  var quizEndContainerEl = document.createElement ("div");
  quizEndContainerEl.className = "end-screen";
  //End of quiz message
  quizEndContainerEl.innerHTML = "<h1 class='end-page'>All done! </h1> <p class='end-content'>Your final score is " + quizScore + ". </p>";
  var highScorePromptEl = document.createElement("div");
  //form submission Element
  highScorePromptEl.setAttribute("class", "form-wrapper form-group");
  highScorePromptEl.innerHTML="<p>Enter Initials!</p>";
  var highScoreFormEl = document.createElement ("form");
  highScoreFormEl.setAttribute("class", "form-input");
  highScoreFormEl.setAttribute("id", "task-form");
  highScoreFormEl.innerHTML = "<input type='text' name='initials' placeholder='Enter your initials!'/>";
  //form submission button
  var scoreSubmitBtnEl = document.createElement ("button");
  scoreSubmitBtnEl.setAttribute("class", "btn submit");
  scoreSubmitBtnEl.setAttribute("type", "submit");
  scoreSubmitBtnEl.textContent = "Submit";
  //appends the button to the form element
  highScoreFormEl.appendChild(scoreSubmitBtnEl);
  //appends the form to the prompt
  highScorePromptEl.appendChild(highScoreFormEl);
  quizEndContainerEl.appendChild(highScorePromptEl);
  //console.log(quizEndContainerEl);
  //appends the quizEnd to the page content
  pageContentEl.appendChild(quizEndContainerEl);
}
//Quiz functionality
  //Array of possible answers is presented as buttons 
  // Function generates a quiz question
var createQuizQuestion = function(questionStatus){
  //checks to see if we're at the beginning of the quiz, clears the start page if so
  if (questionStatus===0 || questionStatus >=quizArray.length) {
  questionStatus = 0;
  timeRemaining = 65;
  var clearStart = document.querySelector(".starting-page"); 
  clearStart.remove();
  }

  var questionContainerEl = document.createElement("div");
  questionContainerEl.className = "quiz-question";
  //IMPT: sets questionStatus to the id, keeps track of question progression
  questionContainerEl.setAttribute("id", questionStatus);

  // render quiz question
  questionContainerEl.innerHTML = "<h3 class='question-text'>" +  quizArray[questionStatus].questionNumber + ". " + quizArray[questionStatus].questionTxt + "</h3>";

  // render answer choices in an unordered list
  var answerChoiceContainerEl = document.createElement("ul");
  //for loop iterates through the answerChoices length and generates a button within a list item with a corresponding number for each answer choice
  for (var i=0; i < quizArray[questionStatus].answerChoices.length; i++) {
  var answerChoiceEl = document.createElement("li");
  var answerButtonEl = document.createElement("button");
  answerButtonEl.textContent = (i+1) + ". " + quizArray[questionStatus].answerChoices[i];
  answerButtonEl.className = "btn answer-choice";
  // IMPT: assigns a data id of i to each answer choice, which will be used to check the answer
  answerButtonEl.setAttribute("data-id", i);
  answerChoiceEl.appendChild(answerButtonEl);
  //appends the answer choice to the unordered list
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
// creates the correct or incorrect message at the bottom 
var createAnswerCheck = function(string) {
  var answerResultEl = document.createElement("div");
  answerResultEl.setAttribute ("class", "answer-status");
  answerResultEl.setAttribute ("id", questionStatus);
  answerResultEl.textContent = string;
  footerContentEl.appendChild(answerResultEl);
}

codingQuizStart();
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("submit", highScoreSubmit);

// end of quiz javascript

