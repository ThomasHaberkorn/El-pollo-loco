let canvas;
let world;
let keyboard = new Keyboard();
let win_sound = new Audio("audio/win.mp3");
let attack_sound = new Audio("audio/attack.mp3");
let welcomesound = new Audio("audio/audio_el_pollo_loco.mp3");
let gameOverSound = new Audio("audio/game-over.mp3");
let timeout;
let ifMutet = false;
/**
 * Initializes and starts the game by setting up the level, creating the game world, playing the welcome sound,
 * and binding necessary event handlers. This function is called to begin gameplay.
 */
function play() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  welcomesound.play();
  removeDnoneToPlay();
  bindBtsPressEvents();
}

/**
 * Sets the corresponding property in the 'keyboard' object to true when specific keys are pressed.
 * This helps track the state of directional keys and spacebar for game controls.
 */
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

/**
 * Resets the corresponding property in the 'keyboard' object to false when specific keys are released.
 * Ensures accurate tracking of key states for gameplay, preventing unintended continuous actions.
 */
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

/**
 * Binds touch event handlers to on-screen control buttons for left, right, jump, and up actions.
 */
function bindBtsPressEvents() {
  keybindLeft();
  keybindRight();
  keybindJump();
  keybindUp();
}

/**
 * Binds touch events to the 'left' button to control left movement in the game.
 * Touch start sets the LEFT key state to true, and touch end sets it to false.
 */
function keybindLeft() {
  document.getElementById("left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
}

/**
 * Binds touch events to the 'right' button to control right movement in the game.
 * Touch start sets the RIGHT key state to true, and touch end sets it to false.
 */
function keybindRight() {
  document.getElementById("right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
}

/**
 * Binds touch events to the 'jump' button to control jumping actions in the game.
 * Touch start sets the SPACE key state to true, and touch end sets it to false.
 */
function keybindJump() {
  document.getElementById("jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * Binds touch events to the 'throw' button to control upward actions in the game.
 * Touch start sets the UP key state to true, and touch end sets it to false.
 */
function keybindUp() {
  document.getElementById("throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById("throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
}

/**
 * Shows a specific text element by removing the 'd-none' class and hides all others.
 * Clears any previous timeouts to prevent conflicts.
 * @param {string} idToShow - The ID of the element to show.
 */
function showTextElement(idToShow) {
  clearTimeout(timeout);
  const elements = ["howToText", "impressumText", "licensesText"];
  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (id === idToShow) {
      element.classList.remove("d-none");
    } else {
      element.classList.add("d-none");
    }
  });
}

/**
 * Schedules the hiding of a specific text element by adding the 'd-none' class after a delay.
 * @param {string} idToHide - The ID of the element to hide.
 */
function hideTextElement(idToHide) {
  timeout = setTimeout(() => {
    document.getElementById(idToHide).classList.add("d-none");
  }, 1500);
}

function showText() {
  showTextElement("howToText");
}

function hideText() {
  hideTextElement("howToText");
}

function showImpressum() {
  showTextElement("impressumText");
}

function hideImpressum() {
  hideTextElement("impressumText");
}

function showLicenses() {
  showTextElement("licensesText");
}

function hideLicenses() {
  hideTextElement("licensesText");
}

/**
 * Toggles the mute state of the game's background music.
 * Updates the sound button icon based on the mute state.
 */
function muteMusic() {
  ifMutet = true;
  sounds();
  let soundImage = document.getElementById("sound");
  if (world.playGameSound.muted) {
    soundImage.src = "img/buttons/mute.png";
  } else {
    soundImage.src = "img/buttons/sound.png";
  }
}

function sounds() {
  world.playGameSound.muted = !world.playGameSound.muted;
  world.coin_sound.muted = !world.coin_sound.muted;
  world.bottle_sound.muted = !world.bottle_sound.muted;
  world.chicken_sound.muted = !world.chicken_sound.muted;
  world.character.jumping_sound.muted = !world.character.jumping_sound.muted;
  world.character.walking_sound.muted = !world.character.walking_sound.muted;
  attack_sound.muted = !attack_sound.muted;
  win_sound.muted = !win_sound.muted;
  gameOverSound.muted = !gameOverSound.muted;
}

/**
 * Initiates fullscreen mode for the element with the ID 'canvasContainer'.
 */
function fullscreen() {
  let fullscreen = document.getElementById("canvasContainer");
  document.getElementById("screen").classList.remove("d-none");
  document.getElementById("fullscreen").classList.add("d-none");
  setClassesForFullscreen();
  enterFullscreen(fullscreen);
}

/**
 * Exits fullscreen mode if it is currently active.
 */
function screen() {
  document.getElementById("screen").classList.add("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
  setClassesForFullscreen();
  exitFullscreen();
}

/**
 * Requests fullscreen mode for a specific DOM element. Supports multiple browser APIs.
 * @param {HTMLElement} element - The DOM element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode, using the appropriate method available on the document.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Hides certain UI elements and reveals others, preparing the screen for gameplay.
 * This function is typically called when transitioning from a menu or start screen to the game itself.
 */
function removeDnoneToPlay() {
  document.getElementById("sound").src = "img/buttons/sound.png";
  document.getElementById("startscreen").classList.add("d-none");
  document.getElementById("playButton").classList.add("d-noneImp");
  document.getElementById("sound").classList.remove("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
  document.getElementById("upperRow").classList.remove("d-noneImp");
}

/**
 * Pauses the game's background sound and plays the attack sound effect.
 */
function attackSound() {
  if (ifMutet == false) {
    world.playGameSound.pause();
    attack_sound.play();
  }
}

/**
 * Handles actions to perform at the end of the game, based on the game outcome.
 * It stops all sounds, clears intervals, updates the UI, and logs the game result.
 * @param {string} event - Indicates if the game was won or lost ("won" or "lost").
 */
function gameOver(event) {
  clearAllGameSounds();
  if (event === "lost") {
    lost();
  } else {
    win();
  }
}

function lost() {
  if (ifMutet == false) {
    gameOverSound.play();
  }
  clearAllIntervals();
  showElementsOnEndScreen();
  document.getElementById("startscreen").src = "img/lost.png";
}

function win() {
  if (ifMutet == false) {
    win_sound.play();
  }
  clearAllIntervals();
  showElementsOnEndScreen();
  document.getElementById("startscreen").src = "img/won.png";
}
/**
 * Modifies UI elements to reflect the end game screen, toggling visibility and styles.
 */
function showElementsOnEndScreen() {
  document.getElementById("upperRow").classList.add("d-noneImp");
  document.getElementById("playButton").classList.add("playButtonTransform");
  document.getElementById("playButton").classList.remove("playButton");
  document.getElementById("startscreen").classList.remove("d-none");
  document.getElementById("playButton").classList.remove("d-noneImp");
}

/**
 * Pauses all game-related sounds.
 */
function clearAllGameSounds() {
  world.playGameSound.pause();
  attack_sound.pause();
}

/**
 * Clears all intervals that have been set in the application.
 * This is a brute force approach to ensure no lingering intervals remain active.
 */
function clearAllIntervals() {
  allIntervals.forEach((id) => clearInterval(id));
  allIntervals.length = 0;
}

/**
 * Removes CSS classes that hide certain elements when the application is in fullscreen mode,
 * especially useful for displaying controls on smaller screens.
 * If the window's inner height is less than 500 pixels, display controls for left, right, jump, and throw actions.
 */
function setClassesForFullscreen() {
  let mobile = detectMobileDevice();
  let touch = hasTouchEvents();
  if (mobile || touch) {
    document.getElementById("left").classList.remove("d-none");
    document.getElementById("right").classList.remove("d-none");
    document.getElementById("jump").classList.remove("d-none");
    document.getElementById("throw").classList.remove("d-none");
  } else {
    document.getElementById("left").classList.add("d-none");
    document.getElementById("right").classList.add("d-none");
    document.getElementById("jump").classList.add("d-none");
    document.getElementById("throw").classList.add("d-none");
  }
}

/**
 * Detects if the current device is a mobile device based on the user agent string.
 * This function checks the browser's user agent string for keywords that identify
 * mobile devices, such as 'iphone', 'android', etc.
 *
 * @returns {boolean} True if the user agent string matches a mobile device, false otherwise.
 */
function detectMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
}

/**
 * Determines if the current device supports touch events. This function checks
 * if touch events are available in the window object or if the navigator object
 * reports any touch points.
 *
 * @returns {boolean} True if touch events are supported, false otherwise.
 */
function hasTouchEvents() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * An array to store all active interval IDs.
 */
const allIntervals = [];

/**
 * Overwrites the window.setInterval function to track all interval IDs.
 *
 * @param {Function} callback - The function to be executed repeatedly after each interval.
 * @param {number} interval - The time (in milliseconds) between each execution of the callback.
 * @param {...any} args - Additional arguments that will be passed to the callback function.
 * @returns {number} The ID of the new interval, which can be used to stop the interval later.
 */
const originalSetInterval = window.setInterval;
window.setInterval = function (callback, interval, ...args) {
  const id = originalSetInterval(callback, interval, ...args);
  allIntervals.push(id);
  return id;
};
/**
 * Logs all active interval IDs to the console.
 * !!! MUST BE CALLED MANUALLY !!!
 * This is the reason why the console.log was not removed.
 */
function logActiveIntervals() {
  console.log("Aktive Intervall-IDs:", allIntervals);
}
