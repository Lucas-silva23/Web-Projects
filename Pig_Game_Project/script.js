"use strict";

const diceGame = document.querySelector(".dice");
const buttonNewGame = document.querySelector(".btn--new");
const buttonRollDice = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const ActivePlayer = document.querySelector(".player--active");

let currentPlayer = 0;
let currentScore = 0;
let scores = [0, 0];

const rollDice = function () {
  let dice = Math.trunc(Math.random() * 6) + 1;
  diceGame.src = "dice-" + dice + ".png";
  return dice;
};

const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

buttonNewGame.addEventListener("click", function () {
  currentScore = 0;
  scores = [0, 0];
  currentPlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  buttonHold.classList.remove("hidden");
  buttonRollDice.classList.remove("hidden");
  diceGame.classList.remove("hidden");
});

buttonRollDice.addEventListener("click", function () {
  let number = rollDice();
  if (number !== 1) {
    currentScore += number;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    changePlayer();
  }
});

buttonHold.addEventListener("click", function () {
  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  if (scores[currentPlayer] >= 20) {
    buttonHold.classList.add("hidden");
    buttonRollDice.classList.add("hidden");
    diceGame.classList.add("hidden");
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove("player--active");
  } else {
    changePlayer();
  }
});
