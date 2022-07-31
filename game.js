const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const timeLeftDisplay = document.getElementById("time");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

// initial values
const correctPoints = 10;
const timePenalty = 5;
const maxQuestions = 5;

let timeRemaining = 30;

// load question bank
fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// begin game function
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove("hidden");
  startTimer();
}

// new question generator
function getNewQuestion() {
  sessionStorage.setItem("gameScore", score);
  sessionStorage.setItem("gameTime", timeRemaining);
  console.log(availableQuestions.length, questionCounter, timeRemaining);
  if (
    availableQuestions.length === 0 ||
    questionCounter >= maxQuestions ||
    timeRemaining < 1
  ) {
    console.log(availableQuestions.length, questionCounter, timeRemaining);
    //go to the end page
    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;

  //update progress bar
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
  time.innerText = timeRemaining;

  scoreText.innerText = score;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

// show green for correct/red for incorrect by applying class
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
      incrementScore(correctPoints);
    } else {
      timeRemaining -= timePenalty;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    // set delay
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}
