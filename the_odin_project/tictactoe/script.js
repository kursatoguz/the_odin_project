var tie = document.getElementById("tie");
var playerScore = document.getElementById("player-score");
var computerScore = document.getElementById("computer-score");
var displayResult = document.getElementById("display-result")
var board = document.querySelectorAll(".board");
var newGameButton = document.getElementById("new-game");
var newRoundButton = document.getElementById("new-round");
const X = "X";
const O = "O";
var xArray = [];
var oArray = [];
var emptyBoxes = [];
var pScore = 0;
var cScore = 0;
var round = 0;
const winConditions = [ [0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],];
newGameButton.addEventListener("click",newGame);
newRoundButton.addEventListener("click",newRound);

board.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        
        if(round % 2 == 0){
           player1(box,index),
           checkCondition(); 
           round++;
            }
        else{
            player2(box,index);
            checkCondition();
            round++;
        }      
        });
    })


function player1(box,index) {
    if(box.innerHTML == ""){
        box.innerHTML = X;
        xArray.push(index);
      
     }
}
function player2(box,index) {  
    if(box.innerHTML == ""){
        box.innerHTML = O;
        oArray.push(index);      
            
     }
    }
function checkCondition() {
    
   for(var i = 0; i < winConditions.length; i++){
       if(winConditions[i].every(val => xArray.includes(val))){
           pScore++;
           playerScore.innerHTML = `${pScore}`;
           result("X");
           disableBoard();
           return true;
       }
      else if(winConditions[i].every(val => oArray.includes(val))){
           cScore++;
           computerScore.innerHTML = `${cScore}`;
           result("O");
           disableBoard();   
           return true;
    }
    
   }
   checkTie();
}


/*function emptyBoard() {
    
    board.forEach((box,index) => {
        
       if(box.innerHTML == ""){
            emptyBoxes.push(index);
        }
    })
    var random = Math.floor(Math.random() * emptyBoxes.length);
    
    if(emptyBoxes.length!=0){
    computerPlay(emptyBoxes[random]);}
}

function computerPlay(random) {
    
    oArray.push(random);
    board[random].innerHTML = O;
    emptyBoxes = [];
    
}
*/
function newGame() {
    board.forEach(box=>box.innerHTML = "");
    round = 0;
    xArray = [];
    oArray = [];
    enableBoard();
    clearScores();
}

function newRound() {
    round = 0;
    board.forEach(box => box.innerHTML = "");
    xArray = [];
    oArray = [];
    enableBoard();
}

function disableBoard() {
    board.forEach(box => box.style.pointerEvents = "none");
}
function enableBoard() {
    board.forEach(box => box.style.pointerEvents = "auto");
}
function clearScores() {
    pScore = 0;
    cScore = 0;
    playerScore.innerHTML = `${pScore}`;
    computerScore.innerHTML = `${cScore}`;
}
function checkTie() {
    var counter = 0;
    board.forEach(box => {
        if(box.innerHTML == ""){
            counter++;
        }
    })
    if(counter == 0 && checkCondition != true){
        disableBoard();
        displayTie();
    }
}

function displayTie () {
    tie.style.display = "block";
    setTimeout(hideTie,1500);
}
function hideTie() {
    tie.style.display = "none";
}
function result(winner) {
    displayResult.style.display = "block";
    displayResult.innerHTML = `${winner} Wins`;
    setTimeout(hideResult,3000);
}
function hideResult() {
    displayResult.style.display = "none";
}