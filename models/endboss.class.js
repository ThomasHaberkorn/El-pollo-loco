/**
 * Represents the endboss character in the game, a formidable enemy with complex behaviors including walking, alerting, attacking, and dying animations.
 * This class handles various states of the endboss and manages transitions between these states based on game events.
 *
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  width = 300;
  height = 450;
  y = 10;
  x = 450;
  speed = 15;
  offset = {
    x: 30, // left
    y: 80, // top
    width: 30, // right
    height: 0, // bottom
  };
  dead_interval;
  bossAttackWalk;
  win_sound = new Audio("audio/win.mp3");
  attack_sound = new Audio("audio/attack.mp3");
  IMAGES_WALKING = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "../img/4_enemie_boss_chicken/3_attack/G13.png",
    "../img/4_enemie_boss_chicken/3_attack/G14.png",
    "../img/4_enemie_boss_chicken/3_attack/G15.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGE_BOSS_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];
  IMAGES_DEAD = ["../img/4_enemie_boss_chicken/5_dead/G24.png", "../img/4_enemie_boss_chicken/5_dead/G25.png", "../img/4_enemie_boss_chicken/5_dead/G26.png"];

  /**
   * Initializes a new instance of the Endboss class.
   * Loads images, sets initial properties, and starts the main animation loop.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGE_BOSS_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
    this.isAlive = true;
    this.hitsLeft = 5;
    this.isHurt = false;
    this.isDead = false;
    this.angry = false;
  }

  chickenDead() {
    if (this.hitsLeft === 0) {
      this.isAlive = false;
    }
  }

  isNowDead() {
    return !this.isAlive;
  }

  /**
   * Manages the animation logic for the endboss, handling its behavior when hurt, attacking, or dying.
   */
  animate() {
    setInterval(() => {
      this.bossHurtAnimation();
    }, 100);

    setInterval(() => {
      this.setBossAngry();
    }, 1000 / 6);

    setInterval(() => {
      this.deadAnimation();
    }, 1000 / 6);
  }

  /**
   * Plays the hurt animation sequence for the endboss when it is hurt.
   * Resets the hurt status after a short delay, allowing for a temporary visual effect.
   */
  bossHurtAnimation() {
    if (this.isHurt) {
      this.playAnimation(this.IMAGE_BOSS_HURT);
      setTimeout(() => {
        this.isHurt = false;
      }, 700);
    }
  }

  /**
   * Checks if the endboss should become angry based on the player's position.
   * If conditions are met (player near and not already angry), triggers attack animations and sounds.
   */
  setBossAngry() {
    if (world.character.x > 2000 && !this.angry) {
      this.bossAnimation();
      this.bossAttack();
      attackSound();
      this.soundAttach();
      this.angry = true;
    }
  }

  /**
   * Manages the death animation of the endboss.
   * Once the boss is confirmed dead, it plays the death animation and eventually removes the boss from the game,
   * triggering the end of level or game win condition.
   */
  deadAnimation() {
    if (!this.isAlive) {
      clearInterval(this.bossAttackWalk);
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
        this.isDead = true;
      }, 700);
    }
    if (this.isDead) {
      this.y += 100;
      clearInterval(this.dead_interval);
      this.loadImage(this.IMAGES_DEAD[1]);
      setTimeout(() => {
        world.level.enemies.splice(8, 1);
        clearInterval(world.runcheck);
        gameOver("won");
      }, 1000);
    }
  }

  /**
   * Specific animations and behaviors for the endboss during its attack phase.
   */
  bossAnimation() {
    this.i = 0;
    this.bossAttackWalk = setInterval(() => {
      if (this.i < 10 && this.isAlive) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      this.i++;
    }, 1000 / 6);
  }

  /**
   * Handles the endboss's attack movement, decreasing the position incrementally based on remaining hits.
   */
  bossAttack() {
    setInterval(() => {
      if (this.hitsLeft === 3) {
        this.x -= 5;
      }
      if (this.hitsLeft === 2) {
        this.x -= 10;
      }
      if (this.hitsLeft === 1) {
        this.x -= 15;
      }
      if (this.hitsLeft === 0) {
        this.x -= 0;
      }
    }, 1000 / 6);
  }

  soundAttach() {
    world.playGameSound.pause();
  }
}
