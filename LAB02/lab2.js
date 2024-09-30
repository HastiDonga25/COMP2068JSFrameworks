const prompt = require('prompt'); // Import the 'prompt' module to get user input

// Start the prompt for user input
prompt.start();

// Function to get the computer's selection
function comSelection() {
    const randomNumber = Math.random(); // Generate a random number between 0 and 1

    // Use the random number to determine the computer's choice
    if (randomNumber <= 0.34) return 'PAPER';
    else if (randomNumber <= 0.67) return 'SCISSORS';
    else return 'ROCK';
}

// Function to determine the winner of the game
function winner(userSelection, computerSelection) {
    // If both selections are the same, it's a tie
    if (userSelection === computerSelection) {
        return "It's a tie";
    } 
    // Check if the user wins using the standard Rock, Paper, Scissors rules
    else if (
        (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
    ) {
        return 'User Wins';
    } 
    // If the user doesn't win and it's not a tie, the computer wins
    else {
        return 'Computer Wins';
    }
}

// Function to play the Rock-Paper-Scissors game
function playGameRPS() {
    // Prompt the user to select ROCK, PAPER, or SCISSORS
    prompt.get(['userSelection'], function (err, result) {
        const userSelection = result.userSelection.toUpperCase(); // Convert user input to uppercase for consistency

        // Validate the user input to make sure it's a valid selection
        if (!['ROCK', 'PAPER', 'SCISSORS'].includes(userSelection)) {
            console.log('Invalid selection. Please choose ROCK, PAPER, or SCISSORS.');
            return playGameRPS(); // Ask for input again if the selection is invalid
        }

        // Get the computer's selection
        const computerSelection = comSelection();
        console.log(`User Selection: ${userSelection}`);
        console.log(`Computer Selection: ${computerSelection}`);

        // Determine the winner and display the result
        const outcome = winner(userSelection, computerSelection);
        console.log(outcome);

        // Ask the user if they want to play again
        prompt.get(['playAgain'], function (err, result) {
            const playAgain = result.playAgain.toLowerCase(); // Convert input to lowercase for comparison

            // If the user wants to play again, restart the game
            if (playAgain === 'yes' || playAgain === 'y') {
                playGameRPS(); // Recursively call the function to play again
            } 
            // If the user doesn't want to play again, end the game
            else {
                console.log('Thanks for playing!');
            }
        });
    });
}

// Start the game by calling the playGameRPS function
playGameRPS();
