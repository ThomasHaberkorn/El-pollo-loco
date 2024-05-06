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

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 450; //2500
    this.animate();
    this.isAlive = true;
    this.hitsLeft = 3;
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
      this.playAnimation(this.IMAGES_ALERT);
    }, 1000 / 6);
    // this.moveLeft();
  }
}
