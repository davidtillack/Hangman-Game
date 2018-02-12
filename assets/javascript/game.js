
// Run the entire page once DOM and images are ready

$( window ).on( "load", function() {

// Set global variables and initialize game play
	var wordBank = ['astroid','spaceship','fuel', 'planets', 'gravitation' , 'probe' , 'sputnik' , 'supernova','crater',
					 'cosmos','moon','celestial','rocket','blackhole','ray','alien','satellite','orbit'];
			 
	var wordRand = "";
	var lettersCount = [];
	var underscores = 0;
	var convertUnderToLetter = [];
	var wrongLetters = [];
	
// Game stats counters
	var wins = 0;
	var losses = 0;
	var remainingGuesses = 11;

// Audio for when player wins / losses
	var audioWin = new Audio('./assets/Sound/sound1.mp3');
	var audioLost = new Audio('./assets/Sound/sound2.mp3');

// ==========================================================================

	// Trigger function with "onkeyup"
	document.onkeyup = function(eventkey){
	if (eventkey.which < 65 || eventkey.which > 90) {
        return;
    }
	// Convert keycode to characters
	  var guessedLetter = String.fromCharCode(eventkey.keyCode).toLowerCase(); // Holds the value in which the user presses on their keyboard
	  console.log(guessedLetter);
	  
	  // Gather from functions below
	  checkLetters(guessedLetter);
	  gameComplete();
	}

	function initializeGame() {
		wordRand = wordBank[(Math.floor(Math.random()*wordBank.length)+1)]; // Pick random word from the word bank array
		console.log(wordRand);
	    lettersCount = wordRand.split(""); // Array of individual letters
	    console.log(lettersCount);
	    underscores = lettersCount.length; // Number of underscores associated
	    console.log(underscores);
	    remainingGuesses = 11; // Clears and sets value after the first round consistently
	    wrongLetters = []; // Clears and sets value after the first round consistently
	    convertUnderToLetter = []; // Clears and sets value after the first round consistently

	    // Create and push the appropriate number of blanks for the player to see (initializes the new word w/its blanks)
	    for(var i = 0; i < underscores; i++){
	      convertUnderToLetter.push(' _ ');
	    }
	    console.log(convertUnderToLetter);
	}

	// Call back the function "initializeGame" 
	initializeGame();

	function checkLetters(letter) {
	// First step up function is to check if the letter chosen equals any letter in the word chosen
		var isLetterInWord = false;
		
		for(i = 0; i < underscores; i++) {
	    	if(wordRand[i] == letter) {
	        isLetterInWord = true;
	    	}
	  	}
	  
		if(isLetterInWord) {
	  		for (var i = 0; i< underscores; i++){
	   	 		if(wordRand[i] == letter) {
	      			convertUnderToLetter[i] = letter;
	        	}
	   		}
	  	}

	  else {
	  	wrongLetters.push(letter);
	  	remainingGuesses--;
		}

	 console.log(convertUnderToLetter);
	}

	function gameComplete() {

	  if (remainingGuesses == 5){
	   	alert("Hint: if you haven't noticed already, this is a space themed game, so think space!")
	   }

	  if (remainingGuesses == 2 ){
	    	alert("Warning: You're running low on guesses -- choose wisely!")
	   }

	  if (lettersCount.toString() == convertUnderToLetter.toString()) {
	    wins++
	    audioWin.play();
	    alert("You Won "+ wins+" Game(s) of Hangman!");
	    document.getElementById("dispWins").innerHTML = wins;
	    initializeGame();
	  }

	  if (remainingGuesses == 0) {
	    losses++;
	    audioLost.play();
	    alert("You Lost "+losses+" Game(s) of Hangman! The word was "+"'"+wordRand+".'");
	    document.getElementById("dispLosses").innerHTML = losses;
	    initializeGame();
	  }

	  document.getElementById("numGuesses").innerHTML = remainingGuesses;
	  document.getElementById("convertLetter").innerHTML = convertUnderToLetter.join(" ");
	  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	}
});  
