/**
 * Represents a character in a game environment that can move, jump, and interact with the game world.
 * Extends `MovableObject` to inherit basic movement capabilities and adds complex animations and sound effects.
 *
 * @extends {MovableObject}
 */
class Character extends MovableObject {
  height = 320;
  width = 200;
  y = 120;
  speed = 5;
  lastWalk = new Date().getTime();
  idle;
  sleep;
  world;
  currentImage = 0;
  walking_sound = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  boss;
  bossx;
  pepeOffsetX;
  offset = {
    x: 25, // left
    y: 110, // top
    width: 30, // right
    height: 0, // bottom
  };
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = ["../img/2_character_pepe/4_hurt/H-41.png", "../img/2_character_pepe/4_hurt/H-42.png", "../img/2_character_pepe/4_hurt/H-43.png"];

  /**
   * Initializes a new instance of the Character class.
   */
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.moveDirection();
    this.waiting();
    this.sleeping();
  }
  /**
   * Sets up the character's animations and sets intervals for movement, death, and other actions.
   */

  animate() {
    this.deadinterval = setInterval(() => {
      this.animationWalkDead();
    }, 1000 / 12);

    this.deadinterval2 = setInterval(() => {
      this.animationHurtJump();
    }, 200);
  }

  moveDirection() {
    setInterval(() => {
      this.animationForMoveDirectionAndJump();
    }, 1000 / 60);
  }

  /**
   * Handles directional movement and jumping based on keyboard input.
   */
  animationForMoveDirectionAndJump() {
    this.walking_sound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
      this.walkRight();
      if (this.bossCollision()) {
        this.x -= this.speed + 3;
      }
    }
    if (this.world.keyboard.LEFT && this.x > -590 && !this.isDead()) {
      this.walkLeft();
    }
    if (this.world.keyboard.SPACE && !this.isAbooveGround() && !this.isDead()) {
      this.lastWalkTime();
      this.jump();
    }
    this.world.camera_x = -this.x + 80;
  }

  /**
   * Checks for collision with the boss enemy.
   * @returns {boolean} Returns true if there is a collision with the boss enemy, otherwise returns undefined.
   */
  bossCollision() {
    this.boss = this.world.level.enemies[8];
    this.bossOffsetX = this.boss.x - this.boss.offset.x;
    this.pepeOffsetX = this.x - this.offset.width;
    if (this.pepeOffsetX >= this.bossOffsetX) {
      return true;
    }
  }
  /**
   * Initiates movement to the right and plays a walking sound.
   */
  walkRight() {
    this.lastWalkTime();
    this.moveRight();
    this.otherDirection = false;
    this.walking_sound.play();
  }

  /**
   * Initiates movement to the left and plays a walking sound.
   */
  walkLeft() {
    this.lastWalkTime();
    this.moveLeft();
    this.otherDirection = true;
    this.walking_sound.play();
  }

  /**
   * Handles the character's walking or death animation based on the game state.
   */
  animationWalkDead() {
    if ((this.world.keyboard.RIGHT && !this.isAbooveGround()) || (this.world.keyboard.LEFT && !this.isAbooveGround())) {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  /**
   * Handles the character's jumping, hurt, or death animations based on the game state.
   */
  animationHurtJump() {
    if (this.isDead()) {
      this.lost();
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAbooveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Executes actions when the character has lost all lives or conditions for defeat are met.
   */
  lost() {
    clearInterval(this.deadinterval);
    clearInterval(this.deadinterval2);
    clearInterval(this.idle);
    clearInterval(this.sleep);
    setInterval(() => {
      this.loadImage(this.IMAGES_DEAD[6]);
    }, 1000 / 12);
    setTimeout(() => {
      clearInterval(world.runcheck);
      gameOver("lost");
    }, 1000);
  }

  /**
   * Sets up a recurring animation for the character when idle.
   */
  waiting() {
    this.idle = setInterval(() => {
      if (!this.time() || (!this.checkEndbossDown() && !this.isDead())) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 1000 / 4);
  }

  /**
   * Sets up a recurring animation for the character when sleeping.
   */
  sleeping() {
    this.sleep = setInterval(() => {
      if (this.time() && this.checkEndbossDown()) {
        this.checkEndbossDown();
        this.playAnimation(this.IMAGES_SLEEP);
      }
    }, 1000 / 4);
  }

  /**
   * Updates the timestamp of the character's last movement.
   */
  lastWalkTime() {
    this.lastWalk = new Date().getTime();
  }

  /**
   * Checks if a certain time has passed since the last movement.
   * @returns {boolean} True if enough time has passed, otherwise false.
   */
  time() {
    let timePassed = new Date().getTime() - this.lastWalk;
    timePassed = timePassed / 1000;
    return timePassed >= 7 || !this.lastWalk;
  }

  /**
   * Checks if the end boss of the level is defeated.
   * @returns {boolean} True if the end boss is down, otherwise false.
   */
  checkEndbossDown() {
    if (this.world.level.enemies[0].isDead) {
      return true;
    }
  }
}
