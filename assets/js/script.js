//Quiz questions and answers in an object oriented format
var quizArray = [{
  questionNumber: 1,
  questionTxt: "A for loop is often used for the purposes of:",
  answerTxt1: "Iterating through a string of values",
  answerTxt2: "For forring your forest",
  answerTxt3: "Flipping burgers",
  answerTF1: true,
  answerTF2: false,
  answerTF3: false
},
{
  questionNumber: 2,
  questionTxt: "The main difference between a for loop and a while loop is:",
  answerTxt1: "one fors, one whiles",
  answerTxt2: "one sets an incremental loop, the other sets a loop with a fixed condition",
  answerTxt3: "Your momma",
  answerTF1: false,
  answerTF2: true,
  answerTF3: false 
}]
var questionsRemaining = quizArray.length;
var quizScore = 0;
var pageContentEl = document.querySelector("#page-content");
//WHEN I click the start button
  //Start of quiz function

//THEN a timer starts and I am presented with a question

//Transitioning from start to first question function

//Quiz functionality
  //Array of possible answers is presented as buttons 
var createQuizQuestion = function(event){
  var questionContainerEl = document.createElement("div");
  questionContainerEl.className = "quiz-question";

  // render quiz question
  questionContainerEl.innerHTML = "<h3 class='question-number'>" +  quizArray[0].questionNumber + "</h3><span class='question-text'>" + quizArray[0].questionTxt + "</span>";

  // render answer choices
  var answerChoiceContainerEl = document.createElement("ol");
  var answerChoiceEl = document.createElement("li");
  var answerButtonEl = document.createElement("button");
  answerButtonEl.textContent = quizArray[0].answerTxt1;
  answerButtonEl.className = "btn answer-choice";

  answerChoiceEl.appendChild(answerButtonEl);
  answerChoiceContainerEl.appendChild(answerChoiceEl);
  questionContainerEl.appendChild(answerChoiceContainerEl);
  pageContentEl.appendChild(questionContainerEl);
}

var checkAnswerChoice = function(event) {
  //compare the answer choice to answer key
  //if answer key is true
    //add answer to score
  //if answer key is false
    //subtract time
    //move on to next question
}


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

createQuizQuestion();

