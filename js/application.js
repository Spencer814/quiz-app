"use strict";

var quiz = [{
  "question": "What is the motto of FC Barcelona?",
  "images": "images/image.jpg",
  "choices": ["You'll never walk alone", "More than a club", "Only the best is good enough", "Victory through harmony"],
  "correct": "More than a club"
}, {
  "question": "Which of these rivalries is the oldest?",
  "images": "images/image.jpg",
  "choices": ["Manchester United FC vs Liverpool FC", "Sevilla FC vs Real Betis", "FC Schalke 04 vs BV Borussia Dortmund", "FC Internazionale vs Juventus FC"],
  "correct": "Manchester United FC vs Liverpool FC"
}, {
  "question": "Which team has the most UEFA Champions League Titles?",
  "images": "images/image.jpg",
  "choices": ["AC Milan", "FC Bayern Munich", "Liverpool FC", "Real Madrid CF"],
  "correct": "Real Madrid CF"
}, {
  "question": "Who is the manager with the most Premier League Titles?",
  "images": "images/image.jpg",
  "choices": ["Arsène Wegner", "Sir Alex Ferguson", "Kenny Dalglish", "José Mourinho"],
  "correct": "Sir Alex Ferguson"
}, {
  "question": "Which London based team has the most League Titles?",
  "images": "images/image.jpg",
  "choices": ["Chelsea FC", "Tottenham Hotspur FC", "Arsenal FC", "West Ham United FC"],
  "correct": "Arsenal FC"
}];

// define elements
var content = $("content"),
  questionContainer = $("question"),
  imagesContainer = $("images"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");

// init vars
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Question " + (currentQuestion + 1) + ": " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "0 correct out of " +
      quiz.length + " possible questions.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = score + " correct out of " +
      quiz.length + " possible questions.";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      endGame();
    }
  }
}

function endGame() {
  document.getElementById("submit").style.display = "none";
  document.getElementById("quiz").style.display = "block";
}

function showFinalResults() {
  document.getElementById("final").style.display = "block";
  content.innerHTML = "<h2>Thanks for taking the Soccer Quiz!</h2>" + "<h2>Here are your results:</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions, " + Math.round(score / quiz.length * 100) + "%<h2>";
    
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var lastend = 0;
    var data = [(quiz.length - score), score];
    var myTotal = 0;
    var myColor = ["red", "green"];

    for(var e = 0; e < data.length; e++) {
      myTotal += data[e];
    }
    for (var i = 0; i < data.length; i++) {
      ctx.fillStyle = myColor[i];
      ctx.beginPath();
      ctx.moveTo(canvas.width /2 , canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
      ctx.lineTo(canvas.width / 2, canvas.height / 2);
      ctx.fill();
      lastend += Math.PI * 2 * (data[i] / myTotal);
    }
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);

function quizProgress() {
    document.getElementById("myProgress").value = score;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ampm = today.getHours() >= 12 ? "pm" : "am";
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    m = checkTime(m);
    s = checkTime(s);
    h = h % 12;
    h = h ? h : 12;
    document.getElementById("date").innerHTML =
    day[today.getDay()] + ", " + month[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear() + "<br>" + h + ":" + m + ":" + s + ampm;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function reloadPage(){
  location.reload();
};

function startQuiz() {
  document.getElementById("content").style.display = "block";
  document.getElementById("start").style.display = "none";
}
