const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const timeBonus = document.getElementById("timeBonus");
const rawScore = document.getElementById("rawScore");

const gameScore = +sessionStorage.getItem("gameScore");
const gameTime = +sessionStorage.getItem("gameTime");

const highScores = JSON.parse(sessionStorage.getItem("highScores")) || [];

const maxHighScores = 5;

let correctedScore = gameScore + gameTime;

finalScore.innerText = `Final Score: ${correctedScore}`;

rawScore.innerText = `Correct Answers (10 pts each): ${gameScore / 10}`;

timeBonus.innerText = `Time Bonus: ${gameTime}`;

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
