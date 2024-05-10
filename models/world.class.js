let character;

/**
 * Represents the game world, managing all game elements, interactions, and the main game loop.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  lastThrow = 0;
  bottleHit = 0;
  bottleHitBoss = false;
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();
  bossbar = new Bossbar();
  throwableObjects = [];
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  chicken_sound = new Audio("audio/singleChickenAlert.mp3");
  playGameSound = new Audio("audio/music.mp3");

  /**
   * Initializes a new World instance.
   * @param {HTMLCanvasElement} canvas - The canvas on which the game will be drawn.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.checkCollisionBottle();
    this.music();
  }

  /**
   * Sets the `world` property of the `character` to this instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Plays the game background music.
   */
  music() {
    this.playGameSound.play();
  }

  /**
   * Main game loop setup, manages the game state updates and periodic checks.
   */
  run() {
    this.runCheck = setInterval(() => {
      this.throwBottle();
    }, 1000 / 60);
    setInterval(() => {
      [this.level.bottles, this.level.coins].forEach((items) => {
        this.sortCollectetItems(items);
      }, 20);
    });
    setInterval(() => {
      this.sortDamageWhileColliding();
    }, 20);
  }

  /**
   * Sorts and processes collision interactions between the character and collectible items in the level.
   * Items can be either bottles or coins, and are collected upon collision.
   */
  sortCollectetItems(items) {
    items.forEach((item, index) => {
      if (this.character.isCollidingItem(item)) {
        if (item === this.level.bottles[index]) {
          this.addBottle(index);
        } else {
          this.addCoin(index);
        }
      }
    });
  }

  /**
   * Checks for and handles collisions between the character and enemies in the level.
   * If the character lands on the enemy, the enemy is marked as dead and a sound is played.
   * Otherwise, the character takes damage if the enemy is still alive.
   */
  sortDamageWhileColliding() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.characterLandsOnEnemy(enemy)) {
          enemy.chickenDead();
          this.chicken_sound.play();
          enemy.isAlive = false;
        } else if (enemy.isAlive == true) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between bottles and enemies as well as the character and items.
   */
  checkCollisionBottle() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
          this.timeBottleThrow(bottle, enemy);
        });
      });
    }, 20);
  }

  /**
   * Handles the interaction when a thrown bottle collides with an enemy.
   */
  timeBottleThrow(bottle, enemy) {
    if (bottle.isCollidingBottle(enemy)) {
      enemy.chickenDead();
      this.chicken_sound.play();
      this.bottleHitBoss = true;
      this.bottleHit++;

      if (this.bottleHit <= 1 && this.checkEndboss(enemy)) {
        enemy.hitsLeft--;
        enemy.isHurt = true;
        this.bossbar.setPercentage(enemy.hitsLeft);
      }
      setTimeout(() => {
        this.bottleHit = 0;
        this.bottleHitBoss = false;
      }, 200);
    }
  }

  checkEndboss(enemy) {
    if (enemy == this.level.enemies[8]) {
      return true;
    }
  }

  /**
   * Adds a coin to the player's total when collected.
   * @param {number} index - The index of the coin in the level's coin array.
   */
  addCoin(index) {
    this.coin_sound.play();
    this.level.coins.splice(index, 1);
    this.character.coins++;
    this.coinbar.setPercentage(this.character.coins);
  }

  /**
   * Adds a bottle to the player's inventory when collected.
   * @param {number} index - The index of the bottle in the level's bottle array.
   */
  addBottle(index) {
    this.bottle_sound.play();
    this.level.bottles.splice(index, 1);
    this.character.bottles++;
    this.bottlebar.setPercentage(this.character.bottles);
  }

  /**
   * Determines if the character lands on an enemy, based on vertical speed.
   * @returns {boolean} True if the character lands on an enemy, otherwise false.
   */
  characterLandsOnEnemy() {
    return this.character.speedY < 0;
  }

  /**
   * Throws a bottle if the conditions are met (e.g., correct key press and timing).
   */
  throwBottle() {
    if (this.time() && this.keyboard.UP) {
      let bottle = new ThrowableObjekts(this.character.x + 135, this.character.y + 180);
      this.throwableObjects.push(bottle);
      this.lastThrow = new Date().getTime();
    }
  }

  /**
   * Checks if enough time has passed since the last throw to allow another.
   * @returns {boolean} True if enough time has passed, otherwise false.
   */
  time() {
    let timePassed = new Date().getTime() - this.lastThrow;
    timePassed = timePassed / 1000;
    return timePassed >= 0.7 || !this.lastThrow;
  }

  /**
   * Main rendering function, clears the canvas and redraws all game elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    // --------  space for fixed objects ---------
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.addToMap(this.bossbar);
    // --------  space for fixed objects end ---------
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Adds multiple game objects to the canvas.
   * @param {DrawableObject[]} objects - Array of drawable objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single game object to the canvas, handling image flipping if necessary.
   * @param {DrawableObject} mo - The game object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally on the canvas.
   * @param {DrawableObject} mo - The game object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state and the position of a flipped image.
   * @param {DrawableObject} mo - The game object whose image was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
