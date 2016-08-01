// "use strict";

var quiz = [{
  "question": "What is the motto of Barcelona?",
  "images": "images/image.jpg",
  "choices": ["You'll never walk alone", "More than a club", "Only the best is good enough", "Victory through harmony"],
  "correct": "More than a club"
}, {
  "question": "Which of these rivalries is the oldest?",
  "images": "images/image.jpg",
  "choices": ["Manchester Utd vs Liverpool", "Sevilla vs Betis", "Schalke vs Dortmund", "Inter Milan vs Juventus"],
  "correct": "Manchester Utd vs Liverpool"
}, {
  "question": "Which team has the most Champions League Titles?",
  "images": "images/image.jpg",
  "choices": ["AC Milan", "Bayern Munich", "Liverpool", "Real Madrid"],
  "correct": "Real Madrid"
}, {
  "question": "Who is the manager with the most Premier League Titles?",
  "images": "images/image.jpg",
  "choices": ["Arsène Wegner", "Sir Alex Ferguson", "Kenny Dalglish", "José Mourinho"],
  "correct": "Sir Alex Ferguson"
}, {
  "question": "Which London based team has the most League Titles?",
  "images": "images/image.jpg",
  "choices": ["Chelsea", "Tottenham", "Arsenal", "West Ham"],
  "correct": "Arsenal"
}];

var content = $("content"),
    questionContainer = $("question"),
    imagesContainer = $("images"),
    choicesContainer = $("choices"),
    scoreContainer = $("score"),
    submitBtn = $("submit");

var currentQuestion = 0,
    score = 0,
    askingQuestion = true;

function $(id) {
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<tr><td class='bubble'><input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'></td>" +
      " <td class='text'><label for='choice" + (i + 1) + "'><p>" + choices[i] + "</p></label></td></tr>";
  }

  questionContainer.innerHTML = "<span class='label label-success'>Question " + (currentQuestion + 1) + ":</span>" +
    "<p class='query'>" + quiz[currentQuestion].question + "</p>";

  choicesContainer.innerHTML = choicesHtml;
}

function checkAnswer() {
  if (askingQuestion) {
    submitBtn.innerHTML = "<p>Next Question</p>";
    askingQuestion = false;

    var userpick,
        correctIndex,
        radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        userpick = radios[i].value;
      }
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }
  } else {
    askingQuestion = true;
    submitBtn.innerHTML = "<p>Submit Answer</p>";
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      endGame();
    }
  }
}

function startQuiz() {
  document.getElementById("content").style.display = "block";
  document.getElementById("start").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.displsy = "none";
}

function endGame() {
  document.getElementById("submit").style.display = "none";
  document.getElementById("quiz").style.display = "inline-block";
}

function showFinalResults() {
  document.getElementById("final").style.display = "block";
  content.innerHTML = "<div class='panel-heading results'><h1 class='panel-title'>Thanks for taking the Quiz!</h1>" + "<h1><small class='head'>Your score: " + Math.round(score / quiz.length * 100) +  "%</small></h1></div>" +
  "<div class='panel-body'><h2>" + score + " out of " + quiz.length + " questions</h2></div>";

  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      lastend = 0,
      data = [(quiz.length - score), score],
      myTotal = 0,
      myColor = ["red", "green"];

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
  var quizBar = score * 20;
  jQuery(".progress-bar.progress-bar-success.progress-bar-striped.active").css("width", quizBar+"%").attr("aria-valuenow", quizBar);
}

function reloadPage(){
  location.reload();
};
