class Coin extends DrawableObject {
  height = 150;
  width = 150;
  x = 300;
  y = 125;
  offset = {
    x: 50, // left
    y: 50, // top
    width: 50, // right
    height: 50, // bottom
  };

  IMAGES_WALKING = ["../img/8_Coin/coin_1.png", "../img/8_Coin/coin_2.png"];

  constructor() {
    super().loadImage("../img/8_Coin/coin_1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 1800;
    // this.y = 0 + Math.random() * 100;
    this.animate();
    this.coins = 0;
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 2);
  }
}
