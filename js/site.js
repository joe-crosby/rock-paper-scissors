// Global collection of options for the game
const options = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
  // Generate a random number 0 - 2 to auto select the computer selection
  return options[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  // Create playRound scope variables
  let selection = capFirst(playerSelection);
  let youWin = false;

  // When both selections are equal, it is a draw.
  if (selection === computerSelection)
    return -1;

  switch (selection){
    // When 'Rock'
    case options[0]:
          // Win when computer did not select 'Paper'
          youWin = computerSelection !== options[1];
      break;
    // When 'Paper'
    case options[1]:
          // Win when computer did not select 'Scissors'
          youWin = computerSelection !== options[2];
      break;
    // When 'Scissors'
    case options[2]:
          // Win when computer did not select 'Rock'
          youWin = computerSelection !== options[0];
      break;
  }

  // convert the boolean value to an integer
  return Number(youWin);
}

function game(count) {
  // Clear the console so the usaer can easily view the results
  console.clear();

  // Create game scope variables
  let replayCount = count;
  let userScore = 0;
  let computerScore = 0;
  let stop;

  while(count > 0){
    // Create while scope variables
    let verdict;
    let selection = prompt("Make your selection: "); // Initialize with user input
    let compSelection = computerPlay();

    // If cancelled exit
    if (!selection) {
      stop = true;
      break;
    }

    // If the value is invald ask again
    if (!isValid(selection))
      continue;

    // Get the verdict
    verdict = playRound(selection, compSelection);

    // Increase the score
    if (verdict === 1)
      userScore++;
    else if (verdict === 0)
      computerScore++;

    // Display the results for this round in the console
    console.log(getRounResultMessage(verdict, selection, compSelection));

    // Decrease the count
    count--;
  }

  // If the user presses cancel, stop
  if(stop)
    return;

  if(confirm(`${getGameResult(userScore, computerScore)}\n\nWould you like to play again?`))
    game(replayCount);
}

// Validate the selection
function isValid(s){
  return options.includes(capFirst(s));
}

// Convert the string to lowercase with the first character capitalized
function capFirst(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function getRounResultMessage(verdict, plSelection, compSelection) {
  return verdict === -1 ? `Draw! you both choose ${compSelection}`: verdict === 0 ? `You lose! ${compSelection} beats ${plSelection}` : `You win! ${plSelection} beats ${compSelection}`;
}

// Calculate the results
function getGameResult(userScore, compScore) {
  return userScore > compScore ? "You win, Good Job!" : userScore < compScore ? "Sorry, but you stink!" : "This game is a wash!";
}
