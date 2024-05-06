class Endboss extends MovableObject {
  width = 300;
  height = 450;
  y = 10;
  x = 450;

  offset = {
    x: 20, // left
    y: 80, // top
    width: 30, // right
    height: 0, // bottom
  };
  dead_interval;
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
  IMAGE_BOSS_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];
  IMAGES_DEAD = ["../img/4_enemie_boss_chicken/5_dead/G24.png", "../img/4_enemie_boss_chicken/5_dead/G25.png", "../img/4_enemie_boss_chicken/5_dead/G26.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGE_BOSS_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 450; //2500
    this.animate();
    this.isAlive = true;
    this.hitsLeft = 3;
    this.isHurt = false;
    this.isDead = false;
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
      if (this.isAlive) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 1000 / 6);
    // this.moveLeft();

    setInterval(() => {
      if (this.isHurt) {
        this.playAnimation(this.IMAGE_BOSS_HURT);
        setTimeout(() => {
          this.isHurt = false;
        }, 700);
      }
    }, 1000 / 6);

    this.dead_interval = setInterval(() => {
      if (!this.isAlive) {
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
      }
    }, 1000 / 6);
  }
}
