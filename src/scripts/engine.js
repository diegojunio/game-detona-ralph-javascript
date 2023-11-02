let gameState = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lives"),
        screenMainMenu: document.querySelector("#screen-main-menu"),
        optionsView: document.querySelector("#options-view"),
        gameLevelView: document.querySelector("#game-level-view"),
        gameOverView: document.querySelector("#game-over"),
        labelScore: document.querySelector("#total-score"),
    },
    values: {
        lifes: 3,
        timerId: null,
        currentTime: 60,
        countDownTimerId: 0,
        musicVolume: setMusicVolue(),
        soundEffectsVolume: setSoundEffectsVolume(),
        gameSpeed: 1000,
        hitPosition: 0,
        totalScore: 0,
    },
}

function displayOptionsView(display) {
    if (display == 'show') {
        gameState.view.optionsView.classList.replace('hide', 'show');
    } else if (display == 'hide') {
        gameState.view.optionsView.classList.replace('show', 'hide');
    }
}

function countDownGameTime() {
    gameState.view.timeLeft.textContent = gameState.values.currentTime;
    gameState.values.currentTime--;
    if (gameState.values.currentTime == 0) {
        gameOver();
    }
}


function randomSquare() {
    gameState.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = gameState.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    gameState.values.hitPosition = randomSquare.id;
}


function countDownLifes() {
    gameState.values.lifes -= 1;
    if (gameState.values.lifes > 0) {
        gameState.view.lifes.textContent = `x${gameState.values.lifes}`;
    } else {
        gameOver();
    }
}

function addListenerHitBox() {
    gameState.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id == gameState.values.hitPosition) {
                gameState.values.totalScore++;
                gameState.view.score.textContent = gameState.values.totalScore;
                playSound("hit");
                gameState.values.hitPosition = null;
            } else {
                countDownLifes();
            }
        });
    })
}

function moveEnemy() {
    gameState.values.timerId = setInterval(randomSquare, gameState.values.gameSpeed);
}

function gamePlay() {
    musicMenu.pause();
    musicAction.play();
    gameState.values.lifes = parseInt(3);
    gameState.view.gameLevelView.classList.replace("hide", "show");
    gameState.values.countDownTimerId = setInterval(countDownGameTime, 1000);
    gameState.view.timeLeft.textContent = gameState.values.currentTime;
    gameState.values.hitPosition = null;
    gameState.view.screenMainMenu.classList.replace("show", "hide");
    gameState.view.lifes.textContent = "x3"
    gameState.view.score.textContent = 0;
    moveEnemy();
}

function gameOver() {
    gameState.values.currentTime = 60;
    gameState.view.lifes.textContent = "x0";
    gameState.view.timeLeft.textContent = 60;
    gameState.view.labelScore.textContent = gameState.values.totalScore;
    clearInterval(gameState.values.timerId);
    clearInterval(gameState.values.countDownTimerId);
    musicAction.pause();
    gameState.view.gameOverView.classList.replace('hide', 'show');
}

function newGame() {
    location.reload();
}

function quitToMainMenu() {
    clearInterval(gameState.values.timerId);
    clearInterval(gameState.values.countDownTimerId);
    gameState.values.totalScore = 0;
    musicAction.currentTime = 60;
    gameState.view.gameOverView.classList.replace('show', 'hide');
    gameState.view.gameLevelView.classList.replace('show', 'hide');
    gameState.view.gameOverView.classList.replace('show', 'hide');
    gameState.view.screenMainMenu.classList.replace('hide', 'show');
    musicAction.pause();
}

function initialize() {
    gameState.values.musicVolume = 0.6;
    gameState.values.soundEffectsVolume = 0.8;
    musicMenu.volume = gameState.values.musicVolume;
    addListenerHitBox();
    document.getElementById("hideclick").click();
}

initialize();