let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

const guessInput = document.getElementById('guessInput');
const submitGuessBtn = document.getElementById('submitGuessBtn');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');
const remainingAttempts = document.getElementById('remainingAttempts');
const resetBtn = document.getElementById('resetBtn');

const handleGuess = () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) return displayMessage('Introduzca un número válido entre 1 y 100.', 'red');

    attempts++;
    attemptsElement.textContent = attempts;
    
    remainingAttempts.textContent = maxAttempts - attempts;

    // Check if the user's guess is correct
    const message = userGuess === secretNumber ? `Felicitaciones. Has adivinado el número en ${attempts} intentos.` 
    : `El número es ${userGuess < secretNumber ? 'más alto' : 'inferior'}. ¡Inténtalo de nuevo!`;

    const color = userGuess === secretNumber ? 'green' : 'red';

    if (attempts >= maxAttempts) {
        displayMessage(`¡Se acabó el juego! El número correcto era ${secretNumber}.`, 'red');
        showResetButton();
        return;
    }

    displayMessage(message, color);

    if (userGuess === secretNumber) showResetButton();
}

// Function to display messages with color
function displayMessage(message, color) {
    messageElement.textContent = message;
    messageElement.style.color = color;
}

// Function to show the reset button
function showResetButton() {
    resetBtn.style.display = 'inline';
}

// Function to reset the game
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsElement.textContent = attempts;
    remainingAttempts.textContent = maxAttempts;
    messageElement.textContent = '';
    resetBtn.style.display = 'none';
    submitGuessBtn.disabled = false;
    resetInput();
}

// Function to reset the input field
function resetInput() {
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
submitGuessBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', resetGame);

guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        remainingAttempts.textContent <= 0 ? resetGame() : handleGuess();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    resetBtn.style.display = 'none';
    remainingAttempts.textContent = maxAttempts;
});