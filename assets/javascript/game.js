// Variables
// ==============================================

// Counter Variables
var winCount = 0; //same
var lossCount = 0; //same
var remainingGuesses = 0;  //doesn't have
var guessesLeft = 10; //same

// Word Array for words that can be guessed
var words = ["abrodolf lincler", "szechuan sauce", "schwifty", "pickle rick", "wubbalubbadubdub", "snowball", "morty", "rick", "summer", "birdperson", "squanchy", "gazorpazorp", "mr poopybutthole", "scary terry", "jerry", "beth", "interdimensional cable", "evil morty"];

// Empty Variables
var selectedWord = ""; //same
var guessedLetters = [];
var lettersInWord = []; //same-ish
var numBlanks = 0; //same
var blanksAndSuccesses = []; //same
var wrongGuesses = []; //wrongLetters

// Functions
// ==============================================

$(document).ready(function (event) {

    function startGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        lettersInWord = selectedWord.split("");
        numBlanks = lettersInWord.length;

        guessesLeft = 10;
        guessedLetters = [];
        blanksAndSuccesses = [];

        for (var i = 0; i < numBlanks; i++) {
            blanksAndSuccesses.push("_");
        }

        document.getElementById("current-word").innerHTML = blanksAndSuccesses.join(" ");
        document.getElementById("remaining-guesses").innerHTML = guessesLeft;
        document.getElementById("win-tracker").innerHTML = winCount;
        document.getElementById("loss-tracker").innerHTML = lossCount;

        console.log(selectedWord);
        console.log(lettersInWord);
        console.log(numBlanks);
        console.log(blanksAndSuccesses);
    }

    function checkLetters(letter) {

        var isLetterInWord = false;
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                isLetterInWord = true;
            }
        }

        if (isLetterInWord) {
            for (var i = 0; i < numBlanks; i++) {
                if (selectedWord[i] == letter) {
                    blanksAndSuccesses[i] = letter;
                }
            }
        }

        else {
            wrongGuesses.push(letter);
            guessesLeft--
        }

        console.log(blanksAndSuccesses);
    }

    function roundComplete() {
        console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guess Left: " + guessesLeft);

        document.getElementById("remaining-guesses").innerHTML = guessesLeft;
        document.getElementById("current-word").innerHTML = blanksAndSuccesses.join(" ");
        document.getElementById("player-guesses").innerHTML = wrongGuesses.join(" ");

        if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
            winCount++;
            alert("You Won!");
            document.getElementById("win-tracker").innerHTML = winCount;

            startGame();
        }

        else if (guessesLeft == 0) {
            lossCount++;
            alert("You Lost!");

            document.getElementById("loss-tracker").innerHTML = lossCount;

            startGame();
        }
    }







    /*    
        // Function to Generate Word for Guessing
        function generateWord() {
            currentWord = words[Math.floor(Math.random() * words.length)];
            lettersInWord = currentWord.split("");
            console.log(currentWord);
            console.log(lettersInWord);
        }
    
        // Function to Create Letter Holder for the Current Word
        function letterHolder() {
            var para = document.createElement("p")
            para.setAttribute("id", "current-word")
            for (var i = 0; i < lettersInWord.length; i++) {
                if (lettersInWord[i] === "-") {
                    var node = document.createTextNode(" - ");
                } else if (lettersInWord[i] === " ") {
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
    */

    // Running the Game
    // ==============================================

    // Call on the functions at the start of the game
    startGame();

    // Keystrokes

    document.onkeyup = function (event) {
        var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        checkLetters(letterGuessed);
        roundComplete();

        console.log(letterGuessed);
    };
});

