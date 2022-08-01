let timerId = timeRemaining;

// update timer display
function timer() {
  if (timeRemaining < 6) {
    timeLeftDisplay.style.color = "red";
  } else {
    timeLeftDisplay.style.color = "black";
  }
  timeLeftDisplay.textContent = timeRemaining;
}

// start clock
function startTimer() {
  timerId = setInterval(runClock, 1000);
  timeLeftDisplay.textContent = timeRemaining;
  scoreText.textContent = score;
  runClock();
  return timeRemaining;
}

// increment clock
function runClock() {
  timeRemaining--;
  console.log(timeRemaining);
  timer();
}
