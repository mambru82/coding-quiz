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
var questionStatus=0;
var quizScore = 0;
var timeRemaining = 20;
var pageContentEl = document.querySelector("#page-content");
var footerContentEl = document.querySelector("#footer-element");

//Function renders initial screen with start button
var codingQuizStart = function(event) {
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
  highScorePromptEl.setAttribute("class", "form-group");
  highScorePromptEl.innerHTML="<h3>Enter your Initials to save your score!</h3>";
  var highScoreFormEl = document.createElement ("div");
  highScoreFormEl.setAttribute("class", "form-group");
  highScoreFormEl.setAttribute("id", "task-form");
  highScoreFormEl.innerHTML = "<input type='text' name='initials' placeholder='Enter your initials!'/>";
  var scoreSubmitBtnEl = document.createElement ("button");
  scoreSubmitBtnEl.setAttribute("form", "btn answer-choice");
  scoreSubmitBtnEl.textContent = "Submit";
  quizEndContainerEl.appendChild(highScorePromptEl);
  quizEndContainerEl.appendChild(highScoreFormEl);
  quizEndContainerEl.appendChild(scoreSubmitBtnEl);
  console.log(quizEndContainerEl);
  pageContentEl.appendChild(quizEndContainerEl);
}
//Quiz functionality
  //Array of possible answers is presented as buttons 
var createQuizQuestion = function(questionStatus){
  if (questionStatus===0) {
  var clearStart = document.querySelector(".starting-page"); 
  clearStart.remove();
  }

  var questionContainerEl = document.createElement("div");
  questionContainerEl.className = "quiz-question";
  questionContainerEl.setAttribute("id", questionStatus);

  // render quiz question
  questionContainerEl.innerHTML = "<h3 class='question-number'>" +  quizArray[questionStatus].questionNumber + "</h3><span class='question-text'>" + quizArray[questionStatus].questionTxt + "</span>";

  // render answer choices
  var answerChoiceContainerEl = document.createElement("ol");

  for (var i=0; i < quizArray[questionStatus].answerChoices.length; i++) {
  var answerChoiceEl = document.createElement("li");
  var answerButtonEl = document.createElement("button");
  answerButtonEl.textContent = quizArray[questionStatus].answerChoices[i];
  answerButtonEl.className = "btn answer-choice";
  answerButtonEl.setAttribute("data-id", i);
  answerChoiceEl.appendChild(answerButtonEl);
  answerChoiceContainerEl.appendChild(answerChoiceEl);
  }
  questionContainerEl.appendChild(answerChoiceContainerEl);
  pageContentEl.appendChild(questionContainerEl);}
  
  var countdown = function(){
  var timeInterval = setInterval(function() {
    if (timeRemaining===0){
    clearInterval(timeInterval);
    var questionClear = document.querySelector(".quiz-question");
    questionClear.remove();
    createFinalScore();
    } else {
    timeRemaining--;
    console.log(timeRemaining);
    return timeRemaining;}
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
  createQuizQuestion(questionStatus); 
  countdown();
  } 
};
var checkAnswerChoice = function(targetEl) {
 if (questionStatus>0) {
   var answerClear = document.querySelector(".answer-status");
   answerClear.remove();
  }
  var answerId = targetEl.getAttribute("data-id");
  console.log(answerId);
  //clear question
  //var questionClear = document.querySelector(".quiz-question[id='" + questionStatus + "']");
    if (quizArray[questionStatus].answerKey[answerId]===true) {
   //create the answer message
    createAnswerCheck("Correct!");
    quizScore++;
  } else {
    createAnswerCheck("Wrong!");
    timeRemaining -=10;
  }
  questionStatus++;
  if (questionStatus < quizArray.length && timeRemaining>0) {
  createQuizQuestion(questionStatus);}
  else {console.log("end of the quiz!");
  createFinalScore();
  }
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

var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');

var message =
  'Congratulations! Now you are prepared to tackle the Challenge this week! Good luck!';
var words = message.split(' ');

// Timer that counts down from 5
function countdown() {
  var timeLeft = 5;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      displayMessage();
    } else {
      mainEl.textContent=timeLeft;
      console.log(timeLeft);
      timeLeft--;
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
  var msgInterval = setInterval(function() {
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      console.log(words[wordCount]);
      wordCount++;
    }
  }, 300);
}

//startBtn.onclick = countdown;

codingQuizStart();
pageContentEl.addEventListener("click", taskButtonHandler)
