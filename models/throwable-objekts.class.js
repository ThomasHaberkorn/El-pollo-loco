/**
 * Represents throwable objects in the game, such as bottles, that can be thrown at enemies.
 * Includes animations for both the rotation of the object while in flight and the impact splash when hitting a target.
 * @extends MovableObject
 */
class ThrowableObjekts extends MovableObject {
  world;
  rotate;
  bossIndex = 0;
  currentImage = 0;

  offset = {
    x: 0, // left
    y: 0, // top
    width: 0, // right
    height: 0, // bottom
  };

  IMAGE_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new throwable object, initializing its properties, loading images, and starting its behavior.
   * @param {number} x - The initial horizontal position of the object.
   * @param {number} y - The initial vertical position of the object.
   */
  constructor(x, y) {
    super().loadImage("img/transparent.png");
    this.loadImages(this.IMAGE_ROTATE);
    this.loadImages(this.IMAGE_SPLASH);
    this.checkEndbossIndex();
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.bottleHitBoss = false;
    this.throw();
  }

  /**
   * Initiates the throwing action of the object, setting its vertical speed, and applying gravity.
   * Decrements the bottle count from the character and updates the status bar.
   */

  throw() {
    if (world.level.enemies[`${this.bossIndex}`].isAlive && world.character.bottles > 0) {
      this.speedY = 35;
      this.applyGravity();
      world.character.lastWalkTime();
      world.character.bottles--;
      world.bottlebar.setPercentage(world.character.bottles);

      if (!world.character.otherDirection) {
        setInterval(() => {
          this.x += 25;
        }, 50);
      } else {
        setInterval(() => {
          this.x -= 30;
        }, 50);
      }
      this.animate();
    }
  }

  /**
   * Manages the animations related to the throwable object, including rotation and splash.
   */
  animate() {
    this.rotate = setInterval(() => {
      this.animateBottleRotation();
    }, 1000 / 12);
    setInterval(() => {
      this.animateBottleSplash();
    }, 1000 / 8);
  }

  /**
   * Animates the rotation of the bottle, used while the object is in flight.
   */
  animateBottleRotation() {
    if (!world.bottleHitBoss) {
      this.playAnimation(this.IMAGE_ROTATE);
      setTimeout(() => {
        clearInterval(this.rotate);
      }, 700);
    }
  }

  /**
   * Animates the splash effect when the object hits a target, displaying a series of splash images.
   */
  animateBottleSplash() {
    if (world.bottleHitBoss) {
      this.playAnimation(this.IMAGE_SPLASH);
      setTimeout(() => {
        this.loadImage("img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png");
        this.bottleHitBoss = false;
        world.throwableObjects.splice(0, 1);
      }, 10);
    }
  }
}
