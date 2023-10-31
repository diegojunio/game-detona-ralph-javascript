const gameState = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
},
    values: {
        lives: 3,
        timerId: null,
        coundDownTimerId: setInterval(countDownScore, 1000),
        gameSpeed: 1000,
        hitPosition: 0,
        totalScore: 0,
        currentTime: 60,
    },
}

function countDownScore(){
    gameState.values.currentTime--;
    gameState.view.timeLeft.textContent = gameState.values.currentTime;
    if(gameState.values.currentTime <= 0){
        clearInterval(gameState.actions.coundDownTimerId);
        clearInterval(gameState.actions.timerId);
        alert('Game Over! Yout score: ' + gameState.values.totalScore);
    }
}

function playSound(audioName){
    let audio = new Audio(`src/audios/${audioName}.m4a`);
    audio.play();
    audio.volume = 0.2;
}

function randomSquare(){
    gameState.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = gameState.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    gameState.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    gameState.values.timerId = setInterval(randomSquare, gameState.values.gameSpeed);
}

function addListenerHitBox(){
    gameState.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === gameState.values.hitPosition){
                gameState.values.totalScore++;
                gameState.view.score.textContent = gameState.values.totalScore;
                gameState.values.hitPosition = null;
                playSound("hit");
            } else {
                
            }
        });
    })
}

function initialize(){
    moveEnemy();
    addListenerHitBox();
}

initialize();