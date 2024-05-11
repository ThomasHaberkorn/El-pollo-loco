/**
 * Provides functions for other classes. Reduces the code, as several classes access these to use them
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  bottles = 0;
  coins = 0;
  lastHit = 0;

  /**
   * Applies gravity effect to the object, causing it to fall or stop at ground level.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAbooveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isAbooveGround()) {
        this.speedY = 0;
        this.y = 120;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAbooveGround() {
    if (this instanceof ThrowableObjekts) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  /**
   * Moves the object to the right by increasing its horizontal position.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by decreasing its horizontal position.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Causes the object to jump by setting a positive vertical speed.
   */
  jump() {
    this.speedY = 45;
    this.jumping_sound.play();
  }

  /**
   * Reduces the object's energy when hit and updates the last hit  stamp.
   */
  hit() {
    this.energy -= 0.32;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  coinJump() {
    this.y = 100;
  }

  /**
   * Checks if the object has recently been hit.
   * @returns {boolean} True if recently hit, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }

  /**
   * Checks if the object's energy has depleted.
   * @returns {boolean} True if energy is zero, otherwise false.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks the index of the end boss in the game level's enemies array.
   */
  checkEndbossIndex() {
    this.bossIndex = world.level.enemies.length - 1;
  }

  /**
   * Increments the count of coins collected by the object.
   */
  taken() {
    this.coins++;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {DrawableObject} obj The other object to check collision against.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(obj) {
    return this.x + this.width - this.offset.x >= obj.x && this.x <= obj.x + obj.width && this.y + this.height - this.offset.height >= obj.y && this.y <= obj.y + obj.height;
  }

  /**
   * Checks if the Bottle is colliding with another object.
   * @param {DrawableObject} obj The other object to check collision against.
   * @returns {boolean} True if colliding, otherwise false.
   */

  isCollidingBottle(obj) {
    return this.x + this.width - this.offset.x >= obj.x && this.x <= obj.x + obj.width && this.y >= obj.y && this.y <= obj.y + obj.height;
  }

  /**
   * Checks if the object is colliding with an item, considering offset adjustments.
   * @param {DrawableObject} obj The item to check collision against.
   * @returns {boolean} True if colliding with the item, otherwise false.
   */
  isCollidingItem(obj) {
    return (
      this.x + this.width - this.offset.x >= obj.x + obj.offset.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offset.y <= obj.y + obj.height - obj.offset.height &&
      this.y + this.height >= obj.y
    );
  }
}
