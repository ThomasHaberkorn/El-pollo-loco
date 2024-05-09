/**
 * Represents a coin in the game. Coins are collectible items that animate on the screen.
 * This class manages the visual representation and animation of a coin.
 *
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
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

  IMAGES_WALKING = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  /**
   * Initializes a new instance of the Coin class. Loads the initial image and sets random properties for position.
   * Begins animation of the coin.
   */
  constructor() {
    super().loadImage("../img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 1800;
    this.y = 0 + Math.random() * 100;
    this.animate();
    this.coins = 0;
  }

  /**
   * Animates the coin by cycling through images to simulate spinning.
   * The animation runs at 2 frames per second.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 2);
  }
}
