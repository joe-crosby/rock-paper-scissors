const options = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
  // Generate a random number 0 - 2 to auto select the computer selection
  return options[Math.floor(Math.random() * 2)];
}

function playRound(playerSelection, computerSelection) {
  // Create playRound scope variables
  let pSel = capFirst(playerSelection);
  let youWin = false;

  // If equal it is a draw.
  if (pSel === computerSelection)
    return `Draw you both choose ${computerSelection}`;

  switch (pSel){
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

  return (youWin === true ? `You win! ${pSel} beats ${computerSelection}` : `You lose! ${computerSelection} beats ${pSel}`);
}

// Convert the string to lowercase with the first character capitalized
function capFirst(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function game(count) {
  // Clear the console so the usaer can easily view the results
  console.clear();

  // Create game scope variables
  let gameResult;
  let replayCount = count;
  let userScore = 0;
  let computerScore = 0;
  let stop;

  while(count > 0){
    // Create while scope variables
    let verdict;
    let selection = prompt("Make your selection: "); // Initialize with user input

    // If cancelled exit
    if (!selection) {
      stop = true;
      break;
    }

    // If the value is invald ask again
    if (!isValid(selection))
      continue;

    // Get the verdict
    verdict = playRound(selection, computerPlay());
    console.log(verdict);

    // Increase the score
    if (verdict.startsWith("You win!"))
      userScore++;
    else if (verdict.startsWith("You lose!"))
      computerScore++;

    // Decrease the count
    count--;
  }

  // If the user presses cancel, stop
  if(stop)
    return;

  // Calculate the results
  gameResult = userScore > computerScore ? "You win, Good Job!" : userScore < computerScore ? "Sorry, but you stink!" : "This game is a wash!";

  if(confirm(`${gameResult}\n\nWould you like to play again?`))
    game(replayCount);
}

// Validate the selection
function isValid(s){
  switch (capFirst(s)){
    case "Rock":
    case "Paper":
    case "Scissors":
      return true;
  }

  return false;
}
