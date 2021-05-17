var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissor = document.getElementById("scissors");
var tie = document.getElementById("tie");
var result = document.getElementById("result");
var btn = document.getElementById("playAgain-btn");
var modal = document.getElementById("modal");
var cScore = document.getElementById("c-score");
var pScore = document.getElementById("p-score");
var computerSelect = document.getElementById("computer-choose");
var playerSelect = document.getElementById("player-choose");

var computerOptions = ["rock","paper","scissors"];
var computersChoice,playersChoice;
var playerScore = 0;
var computerScore = 0;

rock.addEventListener("click",gamePlay);
paper.addEventListener("click",gamePlay);
scissor.addEventListener("click",gamePlay);
btn.addEventListener("click",playAgain);

function gamePlay (e) {
    displayComputerChoice();
    displayPlayerChoice(e);
    updateScore();
}

function computerPlay  () {
    return computerOptions[Math.floor(Math.random() * computerOptions.length)];
}
function displayComputerChoice () {
    computersChoice = computerPlay();
    computerSelect.innerHTML = computersChoice;
}
function displayPlayerChoice (e) {
    playersChoice = e.target.id;
    playerSelect.innerHTML = playersChoice;
}
function updateScore() {
  
    if(playersChoice == computersChoice) {displayTie();}

    else if(playersChoice == "rock" && computersChoice == "scissors" || playersChoice == "scissors" && computersChoice == "paper" || 
    playersChoice == "paper" && computersChoice == "rock"){
        updatePlayerScore();}
    else {
        updateComputerScore();}
    
    checkScores();
}
function displayTie () {
    tie.style.display = "block";
    setTimeout(hideTie,1500);
}
function hideTie() {
    tie.style.display = "none";
}
function updatePlayerScore (){
    playerScore++;
    pScore.innerHTML = playerScore;
}
function updateComputerScore (){
    computerScore++;
    cScore.innerHTML = computerScore;
}
function checkScores() {
    if(computerScore == 5){
        result.innerHTML = "You Lost";
        showModal();
    }
    if(playerScore == 5){
        result.innerHTML = "You Win";
        showModal();
    }
}
function showModal() {
    modal.classList.add("show-modal");
}
function playAgain() {
    modal.classList.remove("show-modal");
    playerScore = 0;
    computerScore = 0;  
    cScore.innerHTML = computerScore;
    pScore.innerHTML = playerScore;
    computerSelect.innerHTML = "";
    playerSelect.innerHTML = "";
    
}