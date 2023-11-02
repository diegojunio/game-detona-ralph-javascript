let musicMenu = new Audio('src/audios/menu-music.mp3');
musicMenu.loop = true;

let musicAction = new Audio('src/audios/action-music.mp3');
musicAction.loop = true;

function setMusicVolue() {
    document.getElementById("music-vol").addEventListener('change', () => {
        gameState.values.musicVolume = document.getElementById("music-vol").value * 0.1;
        musicMenu.volume = gameState.values.musicVolume;
        musicAction.volume = gameState.values.musicVolume;
    })
}

function setSoundEffectsVolume() {
    document.getElementById("effects-vol").addEventListener('change', () => {
        gameState.values.soundEffectsVolume = document.getElementById("effects-vol").value * 0.1;
        playSound("hit");
    })
}

function playMusicMenu() {
    musicMenu.volume = gameState.values.musicVolume;
    musicMenu.play();
}

function playMusicMenuAction() {
    musicAction.volume = gameState.values.musicVolume;
    musicAction.play();
}

function playSound(audioName) {
    let audio = new Audio(`src/audios/${audioName}.m4a`);
    audio.volume = gameState.values.soundEffectsVolume;
    audio.play();
}