"use strict";

const secretNumberFunction = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

let scoreDisplay = Number(document.querySelector(".score").textContent);
let secretNumber = secretNumberFunction();
let highScore = 0;

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".score").textContent = 20;
  scoreDisplay = 20;
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  secretNumber = secretNumberFunction();
});

document.querySelector(".check").addEventListener("click", function () {
  console.log(document.querySelector(".guess").value);
  let guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("No number!");
  } else if (guess === secretNumber) {
    displayMessage("Correct Number!");

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    let finalScore = document.querySelector(".score").textContent;
    if (finalScore > highScore) {
      highScore = finalScore;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    scoreDisplay--;
    document.querySelector(".score").textContent = scoreDisplay;
    if (scoreDisplay > 0) {
      displayMessage(guess > secretNumber ? "Too High!" : "Too Low!");
    } else {
      displayMessage("You lost the game!");
      document.querySelector(".score").textContent = 0;
      document.querySelector(".number").textContent = secretNumber;
    }
  }
});
