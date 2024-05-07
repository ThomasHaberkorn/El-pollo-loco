class Endboss extends MovableObject {
  width = 300;
  height = 450;
  y = 10;
  x = 450;
  speed = 15;

  offset = {
    x: 20, // left
    y: 80, // top
    width: 30, // right
    height: 0, // bottom
  };
  dead_interval;
  bossAttackWalk;
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
    this.hitsLeft = 3;
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

  animate() {
    setInterval(() => {
      if (this.isHurt) {
        this.playAnimation(this.IMAGE_BOSS_HURT);
        setTimeout(() => {
          this.isHurt = false;
        }, 700);
      }
    }, 1000 / 6);

    setInterval(() => {
      if (world.character.x > 2000 && !this.angry) {
        this.bossAnimation();
        this.bossAttack();
        this.angry = true;
        // console.log("Bosswalk", this.bossMoveLeft());
      }
    }, 1000 / 6);

    this.dead_interval = setInterval(() => {
      if (!this.isAlive) {
        clearInterval(this.bossAttackWalk);
        this.playAnimation(this.IMAGES_DEAD);

        setTimeout(() => {
          console.log("enemy", this.dead_interval);
          this.isDead = true;
        }, 700);
      }
      if (this.isDead) {
        this.y += 100;
        clearInterval(this.dead_interval);
        this.loadImage(this.IMAGES_DEAD[1]);
        setTimeout(() => {
          world.level.enemies.splice(8, 1);
          this.won();
        }, 1000);
      }
    }, 1000 / 6);
  }

  bossAnimation() {
    this.i = 0;
    this.bossAttackWalk = setInterval(() => {
      if (this.i < 10 && this.isAlive) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      this.i++;
      console.log("i", this.i);
    }, 1000 / 6);
  }

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
}
