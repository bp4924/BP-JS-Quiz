const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const timeBonus = document.getElementById("timeBonus");
const rawScore = document.getElementById("rawScore");

const mostRecentScore = +sessionStorage.getItem("mostRecentScore");
const mostRecentTime = +sessionStorage.getItem("mostRecentTime");

const highScores = JSON.parse(sessionStorage.getItem("highScores")) || [];

const maxHighScores = 5;

let correctedScore = mostRecentScore + mostRecentTime;

finalScore.innerText = `Final Score: ${correctedScore}`;

rawScore.innerText = `Correct Answers (10 pts each): ${mostRecentScore / 10}`;

timeBonus.innerText = `Time Bonus: ${mostRecentTime}`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("SAVE CLICK");
  e.preventDefault();

  const score = {
    score: correctedScore,
    name: username.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(maxHighScores);

  sessionStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
};
