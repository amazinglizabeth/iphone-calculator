"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const hourEl = document.querySelector(".hour");
  const minuteEl = document.querySelector(".minutes");
  const buttons = document.querySelectorAll(".button");
  const display = document.getElementById("display-value");

  let firstOperand = null;
  let secondOperand = null;
  let currentOperation = null;
  let shouldResetDisplay = false;

  const updateTime = () => {
    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, "0");
  };
  setInterval(updateTime, 1000);
  updateTime();

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(button.dataset.value)
    );
  });

  function handleButtonClick(value) {
    if (!isNaN(value) || value === ".") {
      inputDigit(value);
    } else if (value === "AC") {
      resetCalculator();
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === "%") {
      inputPercent();
    } else if (value === "=") {
      evaluate();
    } else {
      inputOperator(value);
    }
    updateDisplay();
  }

  function inputDigit(digit) {
    if (shouldResetDisplay) {
      display.innerText = digit;
      shouldResetDisplay = false;
    } else {
      display.innerText =
        display.innerText === "0" ? digit : display.innerText + digit;
    }
  }

  function inputOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = parseFloat(display.innerText);
    currentOperation = operator;
    shouldResetDisplay = true;
  }

  function evaluate() {
    if (currentOperation === null || shouldResetDisplay) return;
    secondOperand = parseFloat(display.innerText);
    let result;
    switch (currentOperation) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        result = firstOperand / secondOperand;
        break;
      default:
        return;
    }
    display.innerText = result;
    firstOperand = result;
    currentOperation = null;
    shouldResetDisplay = true;
  }

  function resetCalculator() {
    display.innerText = "0";
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    shouldResetDisplay = false;
  }

  function toggleSign() {
    display.innerText = (parseFloat(display.innerText) * -1).toString();
  }

  function inputPercent() {
    display.innerText = (parseFloat(display.innerText) / 100).toString();
  }

  function updateDisplay() {
    display.innerText = display.innerText.slice(0, 10); // Limit to 10 digits
  }
});
