// Global variables for the game
const options = ['Rock', 'Paper', 'Scissors'];
const bestOf = 5;
let userScore = 0;
let computerScore = 0;

function computerPlay() {
  // Generate a random number 0 - 2 to auto select the computer selection
  return options[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  // Create playRound scope variables
  let youWin = false;

  // When both selections are equal, it is a draw.
  if (playerSelection === computerSelection)
    return -1;

  switch (playerSelection){
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

function getRounResultMessage(verdict, plSelection, compSelection) {
  return verdict === -1 ? `Draw!`: verdict === 0 ? `${compSelection} beats ${plSelection}` : `${plSelection} beats ${compSelection}`;
}

// Calculate the results
function getGameResult(userScore, compScore) {
  let result = userScore > compScore ? "Horray, You won!" : userScore < compScore ? "Sorry, you lost!" : "This game was a wash!";

  return result;
}

function Initialize(reinitialize) {
    userScore = 0;
    computerScore = 0;

    addClickEventListeners(true);

    updateScores();

    if (reinitialize)
      return;

    document.getElementById("restart_button").addEventListener('click', replay);
    document.getElementById("new_game").addEventListener('click', replay);
}

function updateUI(verdict, selection, computerSelection){
    // Increase the score
    if (verdict === 1)
      userScore++;
    else if (verdict === 0)
      computerScore++;

    setMessage(getRounResultMessage(verdict, selection, computerSelection));

    fadeInMessage(document.getElementById("message"));
}

function setMessage(message){
  document.getElementById("message").textContent = message;
}

function fadeInMessage(element){
  removeClickEventListeners();

  // fade in
  element.classList.add("fade-in");
  // fade out
  element.addEventListener("webkitAnimationEnd", removeFade);
}

function removeFade(e){
  if (!e)
    return;

  this.removeEventListener("webkitAnimationEnd", removeFade);
  this.classList.remove("fade-in");

  updateScores();

  addClickEventListeners();

  if(gameIsOver())
    endGame();
}

function gameIsOver() {
  return userScore === bestOf || computerScore === bestOf ? true : false;
}

function addClickEventListeners(initialize){
  if (gameIsOver())
    return;

  setTimeout(() => {
    let element = document.querySelectorAll(".button-label");
    element.forEach((ele) => {
      ele.addEventListener('click', selectionChoosen);
    });
  }, initialize ? 0 : 2000);
}

function removeClickEventListeners(){
  let element = document.querySelectorAll(".button-label");
  element.forEach((ele) => {
    ele.removeEventListener('click', selectionChoosen);
  });
}

function updateScores() {
  document.getElementById("userScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;
}

function selectionChoosen(e) {
  // Play a round and update the UI with the results
  let computerSelection = computerPlay();
  updateUI(playRound(e.currentTarget.id, computerSelection), e.currentTarget.id, computerSelection);
}

function endGame(){
  removeClickEventListeners();
  setTimeout(() => {
    document.getElementById("main").style.display = 'none';
    document.getElementById("game_over").style.display = 'flex';
    document.getElementById("game_over_message").textContent = getGameResult(userScore, computerScore);
  }, 3000);
}

function replay(){
  document.getElementById("main").style.display = 'flex';
  document.getElementById("intro").style.display = 'none';
  document.getElementById("game_over").style.display = 'none';
  Initialize(true);
  // Display the initial message.
  setMessage("Good Luck!");
  fadeInMessage(document.getElementById("message"));
}

Initialize();
