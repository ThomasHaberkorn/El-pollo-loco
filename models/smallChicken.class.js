class SmallChicken extends MovableObject {
  y = 335;
  speed = 0.2;
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

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

  chickenDead() {
    this.isAlive = false;
  }

  isNowDead() {
    return !this.isAlive;
  }

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

  isAbooveGroundChicken() {
    return this.y < 335;
  }

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
        }, 2000);
      }
    }, 1000 / 60);
  }
}