// script.js

// Get elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to store the calculation state
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Function to handle number input
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

// Function to choose an operation
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Function to compute the result
function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result;
    operation = undefined;
    previousOperand = '';
}

// Function to clear the display
function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

// Function to update the display
function updateDisplay() {
    display.innerText = currentOperand || '0';
}

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'clear') {
            clear();
        } else if (value === '=') {
            compute();
        } else {
            chooseOperation(value);
        }
        updateDisplay();
    });
});

// Initial display
updateDisplay();
