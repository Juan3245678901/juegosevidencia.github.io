const cells = document.querySelectorAll('.cell');
const playerToggle = document.getElementById('player-toggle');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWinner(currentPlayer)) {
                alert(`¡Jugador ${currentPlayer} gana!`);
                resetGame();
            } else if ([...cells].every(cell => cell.textContent !== '')) {
                alert('¡Empate!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerToggle.textContent = `Turno: Jugador ${currentPlayer}`;
            }
        }
    });
});

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]           
    ];

    return winningCombos.some(combo => combo.every(index => cells[index].classList.contains(player)));
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    playerToggle.textContent = 'Turno: Jugador X';
}


const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const closeSpan = document.querySelector('.close');

rulesButton.addEventListener('click', () => {
    rulesModal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});



