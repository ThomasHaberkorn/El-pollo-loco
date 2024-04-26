class Coin extends MovableObject {
  height = 150;
  width = 150;

  IMAGES_WALKING = ["../img/8_Coin/coin_1.png", "../img/8_Coin/coin_2.png"];

  constructor() {
    super().loadImage("../img/8_Coin/coin_1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 1800;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 2);
  }
}
