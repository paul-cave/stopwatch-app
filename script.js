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

// HELPER VARIABLES
let mode = "timer";
let timer;
let timeStore;

// TIMER FUNCTIONS

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

// HELPER FUNCTIONS

// NAV TOGGLE
const navClassToggle = function () {
  navTimer.classList.toggle("nav-selected");
  navStop.classList.toggle("nav-selected");
};

// SHOW START BUTTON, HIDE OTHERS
const resetButtonVisibility = function () {
  startBtn.classList.remove("hidden");
  pauseResumeBtn.classList.add("hidden");
  resetCancelBtn.classList.add("hidden");
};

// TOGGLE PAUSE/RESUME BUTTON CLASS
const pauseResumeToggle = function () {
  pauseResumeBtn.classList.toggle("resume");
  pauseResumeBtn.classList.toggle("pause");
};

// SHOW TIME DISPLAY, HIDE INPUT FIELDS
const showDisplayHideInput = function () {
  timeInput.classList.add("hidden");
  timeDisplay.classList.remove("hidden");
};

// SHOW INPUT FIELDS, HIDE DISPLAY
const hideDisplayShowInput = function () {
  timeInput.classList.remove("hidden");
  timeDisplay.classList.add("hidden");
};

// CANCEL TIMER
const cancelTimer = function () {
  clearInterval(timer);
  timeDisplay.textContent = `00:00.00`;
  containerApp.classList.remove("container-app-alert");
  resetButtonVisibility();
};

// EVENT HANDLERS

// START BUTTON PRESS
startBtn.addEventListener("click", function () {
  if (mode === "timer") {
    if (inputMin.value === "" && inputSec.value === "") return;
    if (!isFinite(inputMin.value) || !isFinite(inputSec.value)) return;
    const min = inputMin.value ? +inputMin.value : 0;
    const sec = inputSec.value ? +inputSec.value : 0;
    if (min < 0 || sec < 0) return;
    timer = startTimer(min, sec);
    showDisplayHideInput();
    resetCancelBtn.textContent = "Cancel";
  }
  if (mode === "stopwatch") {
    timer = startStopwatch();
    resetCancelBtn.textContent = "Reset";
  }
  startBtn.classList.add("hidden");
  pauseResumeBtn.classList.remove("hidden");
  resetCancelBtn.classList.remove("hidden");
});

// CANCEL BUTTON PRESS
resetCancelBtn.addEventListener("click", function () {
  cancelTimer();
  if (pauseResumeBtn.classList.contains("resume")) {
    pauseResumeBtn.textContent = "Pause";
    pauseResumeToggle();
  }
  if (mode === "timer") {
    hideDisplayShowInput();
    inputMin.value = "";
    inputSec.value = "";
  }
});

// PAUSE BUTTON PRESS
pauseResumeBtn.addEventListener("click", function () {
  pauseResumeToggle();
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
      const [secStop, msec] = sec.split(".");
      timer = startStopwatch(+min, +secStop, +msec);
    }
  }
});

// MODE CHANGE
navBtns.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("nav-selected")) return;

  cancelTimer();
  // select timer
  if (el.classList.contains("nav-btn-timer")) {
    navClassToggle();
    hideDisplayShowInput();
    mode = "timer";
  }
  // select stopwatch
  if (el.classList.contains("nav-btn-stop")) {
    navClassToggle();
    showDisplayHideInput();
    mode = "stopwatch";
  }
});
