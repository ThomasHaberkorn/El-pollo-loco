let canvas;
let world;
let keyboard = new Keyboard();

let welcomesound = new Audio("audio/audio_el_pollo_loco.mp3");
// let playGameSound = new Audio("audio/music.mp3");

function init() {
  // initLevel();
  // canvas = document.getElementById("canvas");
  // world = new World(canvas, keyboard);
  // console.log("My Character is", world.character);
  // console.log("My Enemies are", world.enemies);
}

function play() {
  // init();
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  welcomesound.play();
  // playGameSound.play();
  removeDnoneToPlay();
  bindBtsPressEvents();
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39 || e.keyCode == 68) {
    keyboard.RIGHT = true;
  } else if (e.keyCode == 37 || e.keyCode == 65) {
    keyboard.LEFT = true;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = true;
  } else if (e.keyCode == 38 || e.keyCode == 87) {
    keyboard.UP = true;
  } else if (e.keyCode == 40 || e.keyCode == 83) {
    keyboard.DOWN = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39 || e.keyCode == 68) {
    keyboard.RIGHT = false;
  } else if (e.keyCode == 37 || e.keyCode == 65) {
    keyboard.LEFT = false;
  } else if (e.keyCode == 32) {
    keyboard.SPACE = false;
  } else if (e.keyCode == 38 || e.keyCode == 87) {
    keyboard.UP = false;
  } else if (e.keyCode == 40 || e.keyCode == 83) {
    keyboard.DOWN = false;
  }
});

function bindBtsPressEvents() {
  document.getElementById("left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById("throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
}

// function muteMusic() {
//   world.playGameSound.muted = !world.playGameSound.muted;
// }

function muteMusic() {
  // Toggle den 'muted' Status der Musik
  world.playGameSound.muted = !world.playGameSound.muted;

  // Wechsel des Bildes basierend auf dem 'muted' Status
  var soundImage = document.getElementById("sound");
  if (world.playGameSound.muted) {
    soundImage.src = "img/buttons/mute.png"; // Pfad zum 'Mute'-Bild
  } else {
    soundImage.src = "img/buttons/sound.png"; // Pfad zum normalen Sound-Bild
  }
}

// window.addEventListener("resize", fullscreen);

function fullscreen() {
  let fullscreen = document.getElementById("canvasContainer");
  enterFullscreen(fullscreen);
  document.getElementById("screen").classList.remove("d-none");
  document.getElementById("fullscreen").classList.add("d-none");
  if (window.innerHeight < 500) {
    document.getElementById("left").classList.remove("d-none");
    document.getElementById("right").classList.remove("d-none");
    document.getElementById("jump").classList.remove("d-none");
    document.getElementById("throw").classList.remove("d-none");
  }
}

function screen() {
  exitFullscreen();
  document.getElementById("screen").classList.add("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
  document.getElementById("left").classList.add("d-none");
  document.getElementById("right").classList.add("d-none");
  document.getElementById("jump").classList.add("d-none");
  document.getElementById("throw").classList.add("d-none");
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function removeDnoneToPlay() {
  let startscreen = document.getElementById("startscreen");
  let playbutton = document.getElementById("playButton");
  // document.getElementById("left").classList.remove("d-none");
  // document.getElementById("right").classList.remove("d-none");
  // document.getElementById("jump").classList.remove("d-none");
  // document.getElementById("throw").classList.remove("d-none");
  document.getElementById("sound").classList.remove("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");

  startscreen.remove();
  playbutton.remove();
}

// function removeDnoneToFullscreen() {
//   btnLeft.classList.remove("d-none");
// }
