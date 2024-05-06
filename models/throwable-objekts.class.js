class ThrowableObjekts extends MovableObject {
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
  world;

  currentImage = 0;
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGE_ROTATE);
    this.loadImages(this.IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    // this.loadImages(this.IMAGE_ROTATE);
    // this.loadImages(this.IMAGE_SPLASH);
    this.bottleHitBoss = false;
    this.throw();
  }

  throw() {
    this.speedY = 40;
    this.applyGravity();

    setInterval(() => {
      this.x += 25;
    }, 50);
    this.animate();
    console.log("Throw");
  }

  animate() {
    setInterval(() => {
      if (!this.bottleHitBoss) {
        this.playAnimation(this.IMAGE_ROTATE);
      } else {
        this.playAnimation(this.IMAGE_SPLASH);
        setTimeout(() => {
          this.bottleHitBoss = false;
        }, 700);
      }

      console.log("Throw1");
    }, 1000 / 12);
  }
}

// }

// && this.character.bottles > 0

//     this.loadImages(this.IMAGE_ROTATE);
//     this.loadImages(this.IMAGE_SPLASH);
//     this.x = this.character.x + this.character.width;
//     this.y = 200;
