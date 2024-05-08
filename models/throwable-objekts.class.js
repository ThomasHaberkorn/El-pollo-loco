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
  rotate;
  bossIndex = 0;
  currentImage = 0;
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

  throw() {
    if (world.level.enemies[`${this.bossIndex}`].isAlive && world.character.bottles > 0) {
      this.speedY = 40;
      this.applyGravity();
      world.character.lastWalkTime();
      world.character.bottles--;
      world.bottlebar.setPercentage(world.character.bottles);
      setInterval(() => {
        if (!world.character.otherDirection) {
          this.x += 25;
        } else {
          this.x -= 30;
        }
      }, 50);
      this.animate();
    }
  }

  animate() {
    this.rotate = setInterval(() => {
      if (!world.bottleHitBoss) {
        this.playAnimation(this.IMAGE_ROTATE);
        console.log("rotate", this.rotate);
        setTimeout(() => {
          clearInterval(this.rotate);
        }, 700);
      }
    }, 1000 / 12);
    setInterval(() => {
      if (world.bottleHitBoss) {
        // debugger;

        this.playAnimation(this.IMAGE_SPLASH);
        setTimeout(() => {
          this.loadImage("img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png");
          this.bottleHitBoss = false;
          world.throwableObjects.splice(0, 1);
          // console.log("Throw", world.throwableObjects.length);w
        }, 300);
      }
    }, 1000 / 8);
  }
}
// }

// && this.character.bottles > 0

//     this.loadImages(this.IMAGE_ROTATE);
//     this.loadImages(this.IMAGE_SPLASH);
//     this.x = this.character.x + this.character.width;
//     this.y = 200;
