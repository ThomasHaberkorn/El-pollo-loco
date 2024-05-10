/**
 * Represents a chicken enemy in the game. Chickens have animations for walking and being defeated.
 * They move left across the screen and can change animation states from walking to dead.
 *
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  y = 335;
  speed = 0.2;

  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Initializes a new instance of the Chicken class.
   * Sets random properties for position and speed, loads images, and starts animations.
   */
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    (this.height = 105), (this.width = 80);
    this.x = 350 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.isAlive = true;
  }

  /**
   * Marks the chicken as dead, changing its state to allow for dead animations.
   */
  chickenDead() {
    this.isAlive = false;
  }

  /**
   * Returns whether the chicken is dead.
   * @returns {boolean} True if the chicken is dead, false otherwise.
   */
  isNowDead() {
    return !this.isAlive;
  }

  /**
   * Manages the animation cycles of the chicken, handling walking and death animations.
   * Animations for movement and state changes are controlled through timed intervals.
   */
  animate() {
    setInterval(() => {
      if (this.isAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 6);

    setInterval(() => {
      if (this.isNowDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.y = 1000;
        }, 500);
      }
    }, 60);
  }
}
