// Variables
// ==============================================

// Counter Variables
var wins = 0;
var losses = 0;
var remainingGuesses = 0;
var maxGuesses = 10;

// Word Array for words that can be guessed
var words = ["Abrodolf Lincler", "Szechuan Sauce", "Schwifty", "Pickle Rick", "Wubbalubbadubdub", "Snowball", "Morty", "Rick", "Summer", "Bird-Person", "Squanchy", "Gazorpazorp", "Mr.Poopybutthole", "ScaryTerry", "Jerry", "Beth", "Inter-Dimensional Cable", "Evil Morty"];

// Empty Variables
var currentWord;
var guessedLetters = [];
var lettersOfWord = [];
var wrongGuesses = [];
var hasFinished = false;

// Functions
// ==============================================

$(document).ready(function (event) {

    // Function to Generate Word for Guessing
    function generateWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        lettersOfWord = currentWord.split("");
        console.log(currentWord);
        console.log(lettersOfWord);
    }

    // Function to Create Letter Holder for the Current Word
    function letterHolder() {
        var para = document.createElement("p")
        para.setAttribute("id", "current-word")
        for (var i = 0; i < lettersOfWord.length; i++) {
            if (lettersOfWord[i] === "-") {
                var node = document.createTextNode(" - ");
            } else if (lettersOfWord[i] === " ") {
                var node = document.createTextNode("  ");
            } else {
                var node = document.createTextNode(" _ ");
            };
            para.appendChild(node);
            var element = document.getElementById("currentWordHolder");
            element.appendChild(para);
        };
    }

    generateWord();
    letterHolder();

    //  WORKING LINE ================================
    // Reset Function
    function resetGame() {
        remainingGuesses = maxGuesses;
        currentWordIndex = words(Math.floor(Math.random() * (words.length)));
        guessedLetters = [];
        guessingWord = [];

        updateDisplay();
    };

    //If/Else, to see if letter selected matches random word
    function checkLetters(letter) {
        var letterInWord = false;
        //if the generated randomword is equal to the letter entered... then variable is true
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                letterInWord = true;
            }
        }
        //if letterInWord (false)
        if (letterInWord) {
            //check each letter to see if it matches word
            for (var i = 0; i < blanks; i++) {
                if (randomWord[i] == letter) {
                    blanksAndCorrect[i] = letter;
                }
            }
        }
        //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
        else {
            wrongGuess.push(letter);
            guessesRemaining--;
        }
        console.log(blanksAndCorrect);
    } function updateDisplay() {
        document.getElementById("win-tracker").innerHTML = wins;
        document.getElementById("loss-tracker").innerHTML = losses;
        var guessingWordText = "";
        for (var i = 0; i < guessingWord.length; i++) {
            guessingWordText += guessingWord[i];
        }
        document.getElementById("current-word").innerHTML = guessingWordText;
        document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
        document.getElementById("player-guesses").innerHTML = guessedLetters;
    };

    function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < words[currentWordIndex].length; i++) {
            if (words[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }
        if (positions.length <= 0) {
            remainingGuesses--;
        }
        else {
            for (var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };

    // 
    function checkWin() {
        if (guessingWord.indexOf(" _ ") === -1) {
            wins++;
            hasFinished = true;
        }
    };

    function checkLoss() {
        if (remainingGuesses <= 0) {
            losses++;
            hasFinished = true;
        }
    };

    function makeGuess(letter) {
        if (remainingGuesses > 0) {
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        }
    };

    document.onkeyup = function (event) {
        if (hasFinished) {
            resetGame();
            hasFinished = false;
        }
        else {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toUpperCase());
                updateDisplay();
                checkWin();
                checkLoss();
            }
        }
    };

    // Running the Game
    // ==============================================

    // Call on the functions at the start of the game
    // document.getElementById("#button").onclick = function () { Game() };

    //let keyPressed;

    //document.onkeyup = function (event) {
    //    keyPressed = event.key.toLowerCase();
    //};
});

