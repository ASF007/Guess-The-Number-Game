"use strict";

// consts
const DEFAULT_MAX_TRIES = 10;
const DEFAULT_COLOR = "#222";

// elements
const numberElem = document.querySelector(".number");
const messageElem = document.querySelector(".message");
const triesElem = document.querySelector(".tries");
const guessInp = document.querySelector(".guess");
const checkBtn = document.querySelector(".check");
const againButton = document.querySelector(".again");

// score related data.
let MIN_RANGE, MAX_RANGE, randNum;
let maxTries = DEFAULT_MAX_TRIES; // if user hits 0 then game over and they lost!

triesElem.textContent = maxTries;

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initGame() {
  const num1 = document.querySelector(".num1");
  const num2 = document.querySelector(".num2");

  const minVal = Number(num1.value);
  const maxVal = Number(num2.value);

  MIN_RANGE = num1.value === "" ? 1 : minVal; // default to 1
  MAX_RANGE = num2.value === "" ? 20 : maxVal; // default to 20

  if (MIN_RANGE > MAX_RANGE) {
    [MIN_RANGE, MAX_RANGE] = [MAX_RANGE, MIN_RANGE];
  }

  randNum = getRandInt(MIN_RANGE, MAX_RANGE);

  guessInp.min = MIN_RANGE;
  guessInp.max = MAX_RANGE;
}

function endRound() {
  numberElem.textContent = randNum;
  numberElem.style.width = "30rem";
  numberElem.style.color = "#eed027";
  checkBtn.disabled = true;
  againButton.style.color = "#2eff2e";
}

function updateTries(type = "dec") {
  if (type === "dec") {
    maxTries--;
  } else {
    maxTries = DEFAULT_MAX_TRIES;
  }
  triesElem.textContent = maxTries;
}

function updateMsg(text) {
  messageElem.textContent = text;
}

function updateBgColor(type) {
  const colorMap = {
    win: "#05995b",
    lose: "#882c2c",
    default: DEFAULT_COLOR,
  };

  document.body.style.backgroundColor = colorMap[type] || colorMap.default;
}

// check button logic
initGame();
updateTries("reset");

checkBtn.addEventListener("click", function () {
  const rawGuessVal = guessInp.value;

  if (rawGuessVal == "" || isNaN(Number(rawGuessVal)))
    return updateMsg("❌ Error: Please enter a number.");

  const guess = Number(rawGuessVal);

  console.log(MIN_RANGE, MAX_RANGE);
  if (guess < MIN_RANGE || guess > MAX_RANGE)
    return updateMsg(
      `❌ Error: Guess must be in the range (${MIN_RANGE}-${MAX_RANGE}).`,
    );
  updateTries();

  if (guess === randNum) {
    updateBgColor("win");
    updateMsg("🎉 Congrats... you guessed it!");
    endRound();
  } else if (maxTries > 0) {
    updateMsg(
      guess < randNum
        ? "⏬ Incorrect: Number Too low."
        : "⬆️ Incorrect: Number Too high.",
    );
  } else {
    updateBgColor("lose");
    updateMsg("😔 Sorry You lost (ran out of tries).");
    endRound();
  }
});

document.querySelector(".guess").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("enter clicked");
    document.querySelector(".check").click();
  }
});

// again button logic
againButton.addEventListener("click", function () {
  initGame();
  updateTries("reset");
  againButton.style.color = "#ffffff";
  updateMsg(
    `🚨ALERT: New round started, guess a number between ${MIN_RANGE} and ${MAX_RANGE}. You have ${maxTries} tries.`,
  );
  //updateMsg('Start guessing...');
  updateBgColor("default");
  numberElem.textContent = "?";
  numberElem.style.color = DEFAULT_COLOR;

  checkBtn.disabled = false;
  guessInp.value = "";
});
