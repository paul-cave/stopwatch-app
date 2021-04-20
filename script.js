"use strict";

// DOM elements
const navBtns = document.querySelector(".container-nav");
const navTimer = document.querySelector(".nav-btn-timer");
const navStop = document.querySelector(".nav-btn-stop");
const controlBtns = document.querySelector(".container-btns");
const pauseResumeBtn = document.querySelector(".btn-pause-resume");
const startBtn = document.querySelector(".btn-start");
const resetCancelBtn = document.querySelector(".btn-reset-cancel");
const timeDisplay = document.querySelector(".time");
const timeInput = document.querySelector(".input-timer");

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

// START BUTTON PRESS
startBtn.addEventListener("click", function () {
  startBtn.classList.add("hidden");
  pauseResumeBtn.classList.remove("hidden");
  resetCancelBtn.classList.remove("hidden");
  if (mode === "timer") {
    resetCancelBtn.textContent = "Cancel";
  }
  if (mode === "stopwatch") {
    resetCancelBtn.textContent = "Reset";
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
});

// PAUSE BUTTON PRESS
pauseResumeBtn.addEventListener("click", function () {
  pauseResumeBtn.classList.toggle("resume");
  pauseResumeBtn.classList.toggle("pause");
  if (pauseResumeBtn.classList.contains("resume"))
    pauseResumeBtn.textContent = "Resume";
  if (pauseResumeBtn.classList.contains("pause"))
    pauseResumeBtn.textContent = "Pause";
});
