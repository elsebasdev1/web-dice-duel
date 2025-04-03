const rulesDialog = document.getElementById('rules-dialog');
const cube = document.querySelector('.cube');
const time = 1.85; // Duración total de la animación
const rollButton = document.getElementById('roll-dice');
const turnText = document.getElementById('player-turn');
const roundText = document.getElementById('game-round');
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const players = { "Player 1": 0, "Player 2": 0 };
const restartButton = document.getElementById('restart-game');
const settingsButton = document.getElementById('game-settings');
const settingsDialog = document.getElementById('settings-dialog');
const closeSettingsButton = document.getElementById('close-settings');
const settingsForm = document.getElementById('settings-form');
const diceColorPlayer1 = document.getElementById('dice-color-player1');
const diceColorPlayer2 = document.getElementById('dice-color-player2');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const tblPlayersPlayer1 = document.getElementById('tbl-players-player1');
const tblPlayersPlayer2 = document.getElementById('tbl-players-player2');
const tblHistoryPlayer1 = document.getElementById('tbl-history-player1');
const tblHistoryPlayer2 = document.getElementById('tbl-history-player2');
let roundScores = { "Player 1": 0, "Player 2": 0 };
const historyPopup = document.getElementById("history-popup");
const openHistoryButton = document.getElementById("open-history");
const closeHistoryButton = document.getElementById("close-history");

let turn = 1; //Player 1 starts
let round = 1;
let rollCount = 0;
let isRolling = false;
let audio = new Audio("audio/dice_sound.mp3");
let colorPlayer1 = diceColorPlayer1.value;
let colorPlayer2 = diceColorPlayer2.value;
let player1Name = player1NameInput.value;
let player2Name = player2NameInput.value;

openHistoryButton.addEventListener("click", () => {
    loadFinalScores(); // Cargar historial antes de abrir
    historyPopup.showModal();
});

// Cerrar el popup
closeHistoryButton.addEventListener("click", () => {
    historyPopup.close();
});

function changeBackgroundColor() {
    const color = turn === 1 ? colorPlayer1 : colorPlayer2;
    document.body.style.background = `linear-gradient(0deg, #ddd, ${color} )`;
}

diceColorPlayer1.addEventListener('input', (event) => {
    colorPlayer1 = event.target.value;
    if (turn === 1) {
        changeBackgroundColor();
    }
});

diceColorPlayer2.addEventListener('input', (event) => {
    colorPlayer2 = event.target.value;
    if (turn === 2) {
        changeBackgroundColor();
    }
});

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    colorPlayer1 = diceColorPlayer1.value;
    colorPlayer2 = diceColorPlayer2.value;
    player1Name = player1NameInput.value;
    player2Name = player2NameInput.value;
    turnText.textContent = player1Name;
    tblPlayersPlayer1.textContent = player1Name;
    tblPlayersPlayer2.textContent = player2Name;
    tblHistoryPlayer1.textContent = player1Name;
    tblHistoryPlayer2.textContent = player2Name;
    changeBackgroundColor();
    settingsDialog.close();
});

window.addEventListener('load', () => {
    rulesDialog.showModal();
    loadFinalScores();
});

document.querySelector("#open-popup").addEventListener("click", function(){
    rulesDialog.showModal();
});
document.querySelector(".close-btn").addEventListener("click", function(){
    rulesDialog.close();
});

settingsButton.addEventListener('click', () => {
    settingsDialog.showModal(); 
});

closeSettingsButton.addEventListener('click', () => {
    settingsDialog.close();
});

function rollDice() {
    if (isRolling) {
        return;
    }

    isRolling = true;
    rollCount++;
    audio.currentTime = 0;
    audio.play();

    cube.style.transition = ''; 
    cube.style.animation = ''; 

    // Simular rebote inicial
    cube.style.transition = `transform 0.3s cubic-bezier(0.3, 0.5, 0.5, 1)`;
    cube.style.transform = `translateX(200px) rotateX(720deg) rotateY(720deg) rotateZ(720deg)`;

    setTimeout(() => {
        // Bajada del dado con rebote
        cube.style.transform = `translateY(100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg)`;

        setTimeout(() => {
            // Rotación final aleatoria
            cube.style.transition = `transform ${time}s ease-out`;
            const randomValue = Math.floor(Math.random() * 6) + 1;
            console.log(`randomValue: ${randomValue}`);
            roundScores[`Player ${turn}`] = randomValue;

            switch(randomValue) {
                case 1: cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`; break;
                case 2: cube.style.transform = `translateY(200px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`; break;
                case 3: cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`; break;
                case 4: cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`; break;
                case 5: cube.style.transform = `translateY(200px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`; break;
                case 6: cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`; break;
            }

            players[`Player ${turn}`] += randomValue;
            setTimeout(() => {
                if (turn === 2) { // Solo guardamos el historial después del segundo turno en cada ronda
                    saveToHistory(); // Guardar los puntajes individuales de la ronda
                    roundScores = { "Player 1": 0, "Player 2": 0 }; // Reiniciar valores de la ronda
                }
            }, 1500);
            

            setTimeout(() => {  
                if (round < 4 ) {
                    turn = (turn === 1) ? 2 : 1;
                    if (turn === 1 && round < 3) {
                        round++;
                    }                    
                }
                if(turn ===1){
                    turnText.textContent = player1Name;
                }else{
                    turnText.textContent = player2Name;
                }
                roundText.textContent = ` ${round}`;

                if (rollCount == 6) {
                    setTimeout(() => {
                        let winner;
                        if (players["Player 1"] > players["Player 2"]) {
                            winner = `${player1Name} wins!`;
                        } else if (players["Player 1"] < players["Player 2"]) {
                            winner = `${player2Name} wins!`;
                        } else {
                            winner = "It's a tie!";
                        }
                        alert(winner);
                        rollButton.disabled = true;
                        saveFinalScore();
                    }, 300); //Delay to wait the dice stops
                }


                updatePlayerTable();
                changeBackgroundColor();
                isRolling = false;
            }, time * 1000);  
        }, 300);
    }, 300);
}



//Roll with button
rollButton.addEventListener('click', rollDice);

//Roll with space bar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && rollCount<6) {
        rollDice();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'r') {
        restartGame();
    }
});

document.addEventListener("keydown", function(event){
    if (event.key.toLowerCase() === 'i') {
        dialog.showModal();
    } 
});

function updatePlayerTable() {
    player1.textContent = `${players["Player 1"]} pts`;
    player2.textContent = `${players["Player 2"]} pts`;
}

function restartGame(){
    if (confirm("Restart the game?")) {
        turnText.textContent = `Player 1`;
        roundText.textContent = ` 1`;
        players[`Player 1`] = 0;   
        players[`Player 2`] = 0;  
        player1.textContent = `${players["Player 1"]} pts`;
        player2.textContent = `${players["Player 2"]} pts`; 
        turn = 1; //Player 1 starts
        round = 1;
        player1Name = "Player 1";
        player2Name = "Player 2";
        tblPlayersPlayer1.textContent = player1Name;
        tblPlayersPlayer2.textContent = player2Name;
        tblHistoryPlayer1.textContent = player1Name;
        tblHistoryPlayer2.textContent = player2Name;
        rollCount = 0;
        isRolling = false;
        const historyBody = document.getElementById("history-body");
        historyBody.innerHTML = "";
    } 
}

restartButton.addEventListener('click', restartGame);

function saveToHistory() {
    const historyBody = document.getElementById("history-body");
    const row = document.createElement("tr");

    const roundCell = document.createElement("td");
    const player1Cell = document.createElement("td");
    const player2Cell = document.createElement("td");

    roundCell.textContent = round;
    player1Cell.textContent = `${roundScores["Player 1"]} pts`;
    player2Cell.textContent = `${roundScores["Player 2"]} pts`;

    row.appendChild(roundCell);
    row.appendChild(player1Cell);
    row.appendChild(player2Cell);

    historyBody.appendChild(row);
}

function saveFinalScore() {
    const finalScores = {
        date: new Date().toLocaleString(),
        player1: players["Player 1"],
        player2: players["Player 2"]
    };

    let savedScores = JSON.parse(localStorage.getItem("gameScores")) || [];
    savedScores.push(finalScores);
    localStorage.setItem("gameScores", JSON.stringify(savedScores));

    loadFinalScores(); // Cargar en la tabla
}

function loadFinalScores() {
    const savedScores = JSON.parse(localStorage.getItem("gameScores")) || [];
    const historyBody1 = document.getElementById("history-body1");

    //historyBody1.innerHTML = ""; // Limpiar tabla antes de cargar

    savedScores.forEach(score => {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        const player1Cell = document.createElement("td");
        const player2Cell = document.createElement("td");

        dateCell.textContent = score.date;
        player1Cell.textContent = `${score.player1} pts`;
        player2Cell.textContent = `${score.player2} pts`;

        row.appendChild(dateCell);
        row.appendChild(player1Cell);
        row.appendChild(player2Cell);
        historyBody1.appendChild(row);
    });
}
