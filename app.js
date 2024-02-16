const result = document.getElementById("res");
let currentInput = "";
let operator = "";
let secondOperand = "";
const operatorButtons = document.querySelectorAll(".operator-btn");
const btns = document.querySelectorAll("button");
let isset = false;

for (let val of btns) {
  val.addEventListener("click", function () {
    const text = val.innerHTML;
    handleButtonClick(val, text); // Pass the button element to the function
  });
}

function handleButtonClick(button, value) {
  if (value === "=") {
    calculateResult();
    toggleGlowEffect(operatorButtons, false); // Turn off glow effect after computation
  } else if (value === "AC") {
    clearCalculator();
    toggleGlowEffect(operatorButtons, false); // Turn off glow effect after clearing
  } else if (value === "&#9003;") {
    deleteLastCharacter();
    toggleGlowEffect(operatorButtons, false); // Turn off glow effect after deleting
  } else if (isOperator(value)) {
    operator = value;
    isset = true;
    toggleGlowEffect(operatorButtons, true); // Turn on glow effect when an operator is clicked
  } else {
    if (!isset) {
      updateCurrentInput(value);
    } else {
      secondOperand += value;
      result.value = currentInput + operator + secondOperand;
    }
  }
}

function isOperator(value) {
  return ["+", "-", "*", "/", "%"].includes(value);
}

function updateCurrentInput(value) {
  currentInput += value;
  result.value = currentInput;
}

function clearCalculator() {
  currentInput = "";
  result.value = "";
  isset = false;
  secondOperand = "";
}

function deleteLastCharacter() {
  currentInput = currentInput.slice(0, -1);
  result.value = currentInput;
}

function calculateResult() {
  if (currentInput !== "" && operator !== "" && secondOperand !== "") {
    const firstOperand = parseFloat(currentInput);
    const secondOperandVar = parseFloat(secondOperand);

    switch (operator) {
      case "+":
        currentInput = (firstOperand + secondOperandVar).toString();
        break;
      case "-":
        currentInput = (firstOperand - secondOperandVar).toString();
        break;
      case "*":
        currentInput = (firstOperand * secondOperandVar).toString();
        break;
      case "/":
        currentInput = (firstOperand / secondOperandVar).toString();
        break;
      case "%":
        currentInput = (firstOperand % secondOperandVar).toString();
        break;
      default:
        currentInput = firstOperand.toString();
    }

    result.value = currentInput;
    operator = "";
    isset = false;
    secondOperand = "";
    toggleGlowEffect(operatorButtons, false); // Turn off glow effect for operator buttons after computation
  }
}

function toggleGlowEffect(buttons, enable) {
  buttons.forEach((button) => {
    if (enable) {
      button.classList.add("glowbtn");
    } else {
      button.classList.remove("glowbtn");
    }
  });
}
