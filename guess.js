let randomNumber = (parseInt(Math.random() * 100 + 1));

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p') 

let prevGuess = []
// we will use this array to store the values which user has already submitted,so that user doesn't enter the same value again.

let numGuess = 0;  // variable to monitor how many attempts have been done.

let playGame = true;

if(playGame){  // checking player is available to play or not
    submit.addEventListener('click',function(e){
        e.preventDefault();    // to prevent the values entered in form from going somewhere else

        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
}




// function to check whether the entered value is valid or not.
function validateGuess(guess){
    if(isNaN(guess)){
        alert('please enter a valid Number')
    }
    else if(guess<1){
        alert('please enter a Number greater than 1')
    }
    else if(guess>100){
        alert('please enter a Number leass than 100')
    }else{
        prevGuess.push(guess)
        if(numGuess === 9){
            displayGuess(guess)
            displayMessage(`Game Over . Random number was ${randomNumber}`)

            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

//function to print a message
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right`)
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Number is TOOO low`)
    }
    else if(guess > randomNumber){
        displayMessage(`Number is TOOO high`)
    }
}

function displayGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}  `;
    numGuess++;
    remaining.innerHTML = `${10-numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new game</h2>`
    startOver.appendChild(p)
    playGame = false;
    newGame();
}

function newGame(){

    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(e){
        randomNumber =  (parseInt(Math.random() * 100 + 1));
        prevGuess = []
        numGuess=1
        guessSlot.innerHTML=''
        remaining.innerHTML = `${11-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}