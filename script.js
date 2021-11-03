const gameContainer = document.querySelector("#game");
const currentScore = document.querySelector("#current_score");
const bestResultTag = document.querySelector("#best_result");

let card1 = null;
let card2 = null;
let card1Target = null;
let card2Target = null;
let selectCard = 0;
let b = true; //don't open more than two cards at a time
let currentScoreCount = 0;
let gameOverCount = 0;


const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


//Shuffle colors and create new array
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

//Create DIV and display cards on the page
function createCards(cardsArray){
  for(let i of cardsArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(i);
    gameContainer.append(newDiv);
    newDiv.addEventListener("click", handleCardClick);
  }
}

function handleCardClick(event) {
  
  //First card operations
  if (selectCard === 0 && b && event.target.classList.contains("flipped") === false) {
    card1Target = event.target;
    card1 = card1Target.classList[0];
    card1Target.style.backgroundColor = card1;
    card1Target.classList.add("flipped");
    selectCard++;
    currentScoreCount++;
    currentScore.innerText = "Current score: " + currentScoreCount;
  //Second card operations
  } else if (selectCard === 1 && b && event.target.classList.contains("flipped") === false) {
    card2Target = event.target;
    card2 = card2Target.classList[0];
    card2Target.style.backgroundColor = card2;     
    card2Target.classList.add("flipped");
    selectCard--;
    currentScoreCount++;
    currentScore.innerText = "Current score: " + currentScoreCount;
    b = false;
    //If cards don't match
    if (card1 != card2) {
      console.log("Cards disn't match");
      setTimeout(function(){
        card1Target.style.backgroundColor = "";
        card1Target.classList.remove("flipped");
        card2Target.style.backgroundColor = "";
        card2Target.classList.remove("flipped");
        b = true;
      }, 1000)
    // If cards matched
    } else if (card1 === card2) {
      b = true;
      gameOverCount++;
      console.log("Cards matched");
      //If game is over do this
      if (gameOverCount === (gameContainer.childElementCount / 2)){ //Pop up message Game over
        setTimeout(function(){alert("Game over")}, 500)
        if (localStorage.getItem("best_result") === null || localStorage.getItem("best_result") != null && currentScoreCount < parseInt(localStorage.getItem("best_result"))) {
          localStorage.setItem("best_result", currentScoreCount);
        }
      }
    }      
  }  
}

//Start game. Removes cards, shuffles colors
function startGame() {
  while (gameContainer.hasChildNodes()) {  
    gameContainer.removeChild(gameContainer.firstChild);
  }
  createCards(shuffle(colors))
  currentScoreCount = 0; //set score to 0
  currentScore.innerText = "Current score: " + currentScoreCount;
  gameOverCount = 0; //Set game over count to 0
  if (localStorage.getItem("best_result") != null) {
    bestResultTag.innerText = "Best result: " + localStorage.getItem("best_result");
  } else {
    bestResultTag.innerText = "Best result: 0";
  }
  
}
//Event listener for button "Start game"
const button = document.querySelector("button");
button.addEventListener("click", startGame)

