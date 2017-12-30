// Game Values

let min = 1,
    max = 10, 
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;
//UI elements    
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener 
//Look at event deligation because added to bage after load. Listener needs to be added to parent and then we need to search for target which is the play again. 

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  //validate
  if(isNaN(guess) | guess < min | guess > max){
    setMessage(`Please entere a number between ${min} and ${max}`,'red');
  } 

  //Check if won
  if(guess === winningNum){
    gameOver(true,`${winningNum} is correct`)
  } else {
    guessesLeft--;
    if(guessesLeft === 0){
      //game lost
      gameOver(false,`Game Over. The correct number was ${winningNum}.`);
    } else {
      //game continues
      guessInput.style.borderColor = 'orange';
      guessInput.value = "";
      setMessage(`${guess} is not correct, you have ${guessesLeft} attempts remaining`, 'orange');
    }
    
  }

});

//Game Over 

function gameOver(won, msg){

    let color;
    won === true ? color = "green" : color = "red";
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg)
    message.style.color = color;

  //Play Again?

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';


}

//Get Winning Number

function getRandomNumber(min,max){
 return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message

function setMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}