const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const clearHighScores = document.querySelector("#clearHighScores");

clearHighScores.addEventListener("click", clearScores);

scoreList();

function clearScores() {
  localStorage.clear();
  highScoresList.innerHTML = "";
}

function scoreList() {
  highScoresList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
}
