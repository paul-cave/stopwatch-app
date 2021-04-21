"use strict";

// DOM elements
const navBtns = document.querySelector(".container-nav");
const navTimer = document.querySelector(".nav-btn-timer");
const navStop = document.querySelector(".nav-btn-stop");
const pauseResumeBtn = document.querySelector(".btn-pause-resume");
const startBtn = document.querySelector(".btn-start");
const resetCancelBtn = document.querySelector(".btn-reset-cancel");
const timeDisplay = document.querySelector(".time");
const timeInput = document.querySelector(".input-timer");
const containerApp = document.querySelector(".container-app");
const inputMin = document.querySelector(".input-min");
const inputSec = document.querySelector(".input-sec");

// MODE VARIABLE
let mode = "timer";

// MODE CHANGE
navBtns.addEventListener("click", function (e) {
  const el = e.target;
  // select timer
  if (
    el.classList.contains("nav-btn-timer") &&
    !el.classList.contains("nav-selected")
  ) {
    navTimer.classList.toggle("nav-selected");
    navStop.classList.toggle("nav-selected");
    timeDisplay.classList.add("hidden");
    timeInput.classList.remove("hidden");

    mode = "timer";
  }
  // select stopwatch
  if (
    el.classList.contains("nav-btn-stop") &&
    !el.classList.contains("nav-selected")
  ) {
    navTimer.classList.toggle("nav-selected");
    navStop.classList.toggle("nav-selected");
    timeDisplay.classList.remove("hidden");
    timeInput.classList.add("hidden");
    mode = "stopwatch";
  }
});

// START TIMER
const startTimer = function (minIn, secIn) {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    timeDisplay.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      timeDisplay.textContent = `TIME UP`;
      containerApp.classList.add("container-app-alert");
    }
    time--;
  };
  let time = minIn * 60 + secIn;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// START STOPWATCH
const startStopwatch = function (minIn = 0, secIn = 0, msecIn = 0) {
  const tick = function () {
    const min = String(Math.trunc(time / 60 / 100)).padStart(2, 0);
    const sec = String(Math.trunc((time / 100) % 60)).padStart(2, 0);
    const msec = String(time % 100).padStart(2, 0);
    timeDisplay.textContent = `${min}:${sec}.${msec}`;

    if (time === 360000) {
      clearInterval(timer);
      timeDisplay.textContent = `60:00.00`;
    }
    time += 9;
  };
  let time = (minIn * 60 + secIn) * 100 + msecIn;
  tick();
  const timer = setInterval(tick, 90);
  return timer;
};

// EVENT HANDLERS
let timer;
let timeStore;

// START BUTTON PRESS
startBtn.addEventListener("click", function () {
  startBtn.classList.add("hidden");
  pauseResumeBtn.classList.remove("hidden");
  resetCancelBtn.classList.remove("hidden");
  if (mode === "timer") {
    resetCancelBtn.textContent = "Cancel";
    const min = inputMin.value ? +inputMin.value : 0;
    const sec = inputSec.value ? +inputSec.value : 0;
    timer = startTimer(min, sec);
    timeInput.classList.add("hidden");
    timeDisplay.classList.remove("hidden");
  }
  if (mode === "stopwatch") {
    console.log("STOPWATCH");
    resetCancelBtn.textContent = "Reset";
    timer = startStopwatch();
  }
});

// CANCEL BUTTON PRESS
resetCancelBtn.addEventListener("click", function () {
  startBtn.classList.remove("hidden");
  pauseResumeBtn.classList.add("hidden");
  resetCancelBtn.classList.add("hidden");
  if (pauseResumeBtn.classList.contains("resume")) {
    pauseResumeBtn.textContent = "Pause";
    pauseResumeBtn.classList.toggle("resume");
    pauseResumeBtn.classList.toggle("pause");
  }
  clearInterval(timer);
  containerApp.classList.remove("container-app-alert");
  timeDisplay.textContent = `00:00.00`;
  if (mode === "timer") {
    timeDisplay.classList.add("hidden");
    timeInput.classList.remove("hidden");
    inputMin.value = "";
    inputSec.value = "";
  }
});

// PAUSE BUTTON PRESS
pauseResumeBtn.addEventListener("click", function () {
  pauseResumeBtn.classList.toggle("resume");
  pauseResumeBtn.classList.toggle("pause");
  // when pause is pressed
  if (pauseResumeBtn.classList.contains("resume")) {
    pauseResumeBtn.textContent = "Resume";
    timeStore = timeDisplay.textContent;
    clearInterval(timer);
  }
  // when resume is pressed
  if (pauseResumeBtn.classList.contains("pause")) {
    pauseResumeBtn.textContent = "Pause";
    const [min, sec] = timeStore.split(":");
    if (mode === "timer") {
      timer = startTimer(+min, +sec);
    }
    if (mode === "stopwatch") {
      const [secS, msec] = sec.split(".");
      timer = startStopwatch(+min, +secS, +msec);
    }
  }
});
