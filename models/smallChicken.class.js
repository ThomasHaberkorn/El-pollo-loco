/**
 * Represents a small chicken character in the game. This character has unique animations for walking and being dead,
 * and it includes specialized gravity and movement behaviors.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  y = 335;
  speed = 0.2;
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Constructs a new instance of the SmallChicken class, initializing its properties,
   * loading necessary images, and starting its animation and gravity behaviors.
   */
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    (this.height = 105), (this.width = 80);
    this.x = 350 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    this.applyGravityChicken();
    this.isAlive = true;
  }

  /**
   * Sets the chicken's alive status to false, indicating it is dead.
   */
  chickenDead() {
    this.isAlive = false;
  }

  /**
   * Checks if the chicken is currently dead.
   * @returns {boolean} True if the chicken is dead, otherwise false.
   */
  isNowDead() {
    return !this.isAlive;
  }

  /**
   * Applies gravity specifically tailored for the chicken, affecting its vertical position and speed.
   */
  applyGravityChicken() {
    setInterval(() => {
      if (this.isAbooveGroundChicken() || (this.speedY > 0 && this.isAlive)) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isAbooveGroundChicken() && this.isAlive) {
        this.speedY = 20 + Math.random() * 8;
        this.y = 335;
      }
    }, 1000 / 10);
  }

  /**
   * Determines if the chicken is above the ground level specific to chickens.
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAbooveGroundChicken() {
    return this.y < 335;
  }

  /**
   * Manages the animation intervals for moving left and playing animations for walking and death.
   */
  animate() {
    setInterval(() => {
      this.moveLeftAnimation();
    }, 1000 / 60);

    setInterval(() => {
      this.animateMoving();
    }, 1000 / 6);

    setInterval(() => {
      this.animateDead();
    }, 1000 / 60);
  }

  /**
   * Moves the chicken to the left if it is alive. This method handles the movement animation.
   */
  moveLeftAnimation() {
    if (this.isAlive) {
      this.moveLeft();
    }
  }

  /**
   * Plays the walking animation for the chicken if it is alive.
   */
  animateMoving() {
    if (this.isAlive) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the death animation for the chicken if it is dead. After playing the death animation,
   * the chicken is moved out of the view after a delay.
   */
  animateDead() {
    if (this.isNowDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        this.y = 1000;
      }, 500);
    }
  }
}
