class Bottle extends MovableObject {
  height = 80;
  width = 80;
  y = 350;
  x = 300;

  offset = {
    x: 20, // left
    y: 10, // top
    width: 15, // right
    height: 0, // bottom
  };
  IMAGES_WALKING = ["../img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  //   constructor() {
  //     super().loadImage("../img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  //     this.loadImages(this.IMAGES_WALKING);
  //     this.x = 250 + Math.random() * 2000;
  //   }
  constructor() {
    super();
    let randomImage = this.IMAGES_WALKING[Math.floor(Math.random() * this.IMAGES_WALKING.length)];
    this.loadImage(randomImage);
    // this.x = 250 + Math.random() * 1800;
  }
}
