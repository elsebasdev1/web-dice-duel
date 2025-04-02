const dialog = document.querySelector("dialog");
const cube = document.querySelector('.cube');
const time = 2; // Duración total de la animación
const rollButton = document.getElementById('roll-dice');
const turnText = document.getElementById('player-turn');
const roundText = document.getElementById('game-round');
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const players = { "Player 1": 0, "Player 2": 0 };

let turn = 1; //Player 1 starts
let round = 1;
let rollCount = 0;
let isRolling = false;

window.addEventListener('load', () => {
    dialog.showModal();
});

document.querySelector("#open-popup").addEventListener("click", function(){
    dialog.showModal();
});
document.querySelector(".close-btn").addEventListener("click", function(){
    dialog.close();
});

function rollDice() {
    if (isRolling) {
        return;
    }

    isRolling = true;
    rollCount++;

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
                if (round < 4 ) {
                    turn = (turn === 1) ? 2 : 1;
                    if (turn === 1 && round < 3) {
                        round++;
                    }                    
                }

                turnText.textContent = `Player ${turn}`;
                roundText.textContent = ` ${round}`;

                if (rollCount == 6) {
                    setTimeout(() => {
                        alert("Game finished.");
                        rollButton.disabled = true;
                    }, 300); //Delay to wait the dice stops
                }


                updatePlayerTable();
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

function updatePlayerTable() {
    player1.textContent = `${players["Player 1"]} pts`;
    player2.textContent = `${players["Player 2"]} pts`;
}