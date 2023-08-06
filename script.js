const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const restartgame = document.getElementById('restartgame');
const history = document.getElementById('history');
const rule = document.getElementById('rule');
const description = document.getElementById('description');
const backtomain = document.getElementById('backtomain');
const back = document.getElementById('back');
const pista = document.getElementById('pista');
const piElement = document.getElementById('pi');
const gifWinnerURL = 'https://media.tenor.com/C_d-EdxCk3YAAAAC/you-win-ganaste.gif';
const gifLoserURL = 'https://i.gifer.com/1iF0.gif';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame(loser.style.display = 'block');
    
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    definition.style.display = 'none';
    restartgame.style.display = 'none';
    backtomain.style.display = 'block'; 
    pista.style.display = 'none';
    back.style.display = 'none';
    ligamx.style.display = 'none';
    if (hits === selectedWord.length) {
        winner.style.display = 'block';
        const winnerGif = document.getElementById('winner');
        winnerGif.src = gifWinnerURL;
    } else {
        loser.style.display = 'block';
        const loserGif = document.getElementById('loser');
        loserGif.src = gifLoserURL;
        
}
};

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame(winner.style.display = 'block');
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
        
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#black';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    winner.style.display = 'none';
    loser.style.display = 'none';
    history.style.display = 'none';
    rule.style.display = 'none';
    description.style.display = 'none';
    restartgame.style.display = 'block';
    historia.style.display = 'none';
    descripcion.style.display = 'none';
    reglas.style.display = 'none';
    backtomain.style.display = 'none';
    back.style.display = 'block';
    pista.style.display = 'block';
    pi.style.display = 'none';
    trampa.style.display = 'none';
    mario.style.display = 'none';
    ligamx.style.display = 'none';
    menup.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

const restart = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    winner.style.display = 'none';
    loser.style.display = 'none';
    restartgame.style.display = 'block';
    definition.style.display = 'none';
    pi.style.display = 'none';
    trampa.style.display = 'none';
    ligamx.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
}

function histori (){
    history.style.display = 'none'
    rule.style.display = 'none'
    description.style.display = 'none'
    backtomain.style.display = 'block'
    historia.style.display = 'block'
    mario.style.display = 'none'
    menup.style.display = 'none';
}

const showPista = () => {
    const lettersToShow = [];
    while (lettersToShow.length < 2) {
        const randomIndex = Math.floor(Math.random() * selectedWord.length);
        const randomLetter = selectedWord[randomIndex];
        if (!lettersToShow.includes(randomLetter)) {
            lettersToShow.push(randomLetter);
        }
    }
    piElement.value = lettersToShow.join(' ');
    pi.style.display = 'block'
    winner.style.display = 'none';
    loser.style.display = 'none';
    trampa.style.display = 'block';
    ligamx.style.display = 'block';

};

function descrip (){
    history.style.display = 'none'
    rule.style.display = 'none'
    description.style.display = 'none'
    descripcion.style.display = 'block'
    backtomain.style.display = 'block'
    mario.style.display = 'none'
    menup.style.display = 'none';
}

function regla (){
    history.style.display = 'none'
    rule.style.display = 'none'
    description.style.display = 'none'
    reglas.style.display = 'block'
    backtomain.style.display = 'block'
    mario.style.display = 'none'
    menup.style.display = 'none';
}



startButton.addEventListener('click', startGame);
