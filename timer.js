let timerId = timeRemaining;

// update timer display
function timerDisplay() {
  if (timeRemaining < 6) {
    timeLeftDisplay.style.color = "red";
  }
  timeLeftDisplay.textContent = timeRemaining;
  sessionStorage.setItem("gameTime", timeRemaining);
}

// start clock
function startTimer() {
  timerId = setInterval(runClock, 1000);
  timeLeftDisplay.textContent = timeRemaining;
  scoreText.textContent = score;
  runClock();
  sessionStorage.setItem("gameTime", timeRemaining);
  return timeRemaining;
}

// increment clock
function runClock() {
  timeRemaining--;
  console.log(timeRemaining);
  if (timeRemaining <= 0) {
    sessionStorage.setItem("gameTime", 0);
    return window.location.assign("end.html");
  }
  timerDisplay();
}
