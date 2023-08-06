let player1Score = 0;
let player2Score = 0;
let roundsPlayed = 0;
let totalRounds = 0;
let isAgainstComputer = true;

function computerPlay() {
  const choices = ['piedra', 'papel', 'tijera'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice) {
  if (roundsPlayed >= totalRounds) {
    showResult();
    return;
  }

  let computerChoice;

  if (isAgainstComputer) {
    computerChoice = computerPlay();
    alert(`La computadora eligió: ${computerChoice}`);
  } else {
    const player2Choice = prompt("Jugador 2, elige piedra, papel o tijera:").toLowerCase();
    computerChoice = player2Choice;
  }

  if (playerChoice === computerChoice) {
    alert("Empate.");
  } else if (
    (playerChoice === "piedra" && computerChoice === "tijera") ||
    (playerChoice === "papel" && computerChoice === "piedra") ||
    (playerChoice === "tijera" && computerChoice === "papel")
  ) {
    if (isAgainstComputer) {
      alert("¡Ganaste esta ronda!");
      player1Score++;
    } else {
      alert("¡Jugador 1 ganó esta ronda!");
      player1Score++;
    }
  } else {
    if (isAgainstComputer) {
      alert("¡Perdiste esta ronda!");
      player2Score++;
    } else {
      alert("¡Jugador 2 ganó esta ronda!");
      player2Score++;
    }
  }

  roundsPlayed++;
  updateScores();

  if (player1Score > totalRounds / 2 || player2Score > totalRounds / 2 || roundsPlayed >= totalRounds) {
    setTimeout(() => {
      showResult();
    }, 500);
  }
}

function updateScores() {
  const player1ScoreElement = document.getElementById('player1-score');
  const player2ScoreElement = document.getElementById('player2-score');
  const roundsPlayedElement = document.getElementById('rounds-played');

  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
  roundsPlayedElement.textContent = roundsPlayed;

  if (player1Score > totalRounds / 2 && isAgainstComputer) {
    showResult();
  }
}

function showResult() {
  let resultMessage;

  if (player1Score > player2Score) {
    resultMessage = isAgainstComputer ? "¡Ganaste!" : "¡Jugador 1 ganó!";
  } else if (player2Score > player1Score) {
    resultMessage = isAgainstComputer ? "¡La computadora ganó!" : "¡Jugador 2 ganó!";
  } else {
    resultMessage = "Empate.";
  }

  if (player1Score === player2Score) {
    resultMessage += " Es un empate.";
  }

  document.getElementById('result-message').textContent = resultMessage;
  alert("Juego terminado.\n" + resultMessage);
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  roundsPlayed = 0;

  while (true) {
    totalRounds = parseInt(prompt("Ingresa el número de rondas que quieres jugar:"));

    if (isNaN(totalRounds) || totalRounds <= 0) {
      alert("El número de rondas debe ser mayor a 0. Ingresa un valor válido.");
    } else {
      break;
    }
  }

  isAgainstComputer = confirm("¿Quieres jugar contra la computadora? Si eliges 'Cancelar', jugarás contra otro jugador.");
  updateScores();
}

function goBack() {
  window.location.href = "menu.html";
}

resetGame();


