let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    // console.log("My Character is", world.character);
    // console.log("My Enemies are", world.enemies);
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
