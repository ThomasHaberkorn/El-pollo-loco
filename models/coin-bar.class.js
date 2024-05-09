/**
 * Represents a coin status bar in the game, visually indicating the collection progress of coins.
 * The bar updates its appearance based on the percentage of coins collected.
 *
 * @class
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  percentage = 100;

  /**
   * Initializes a new instance of the CoinBar class.
   * Loads images for the status bar and sets initial properties including location and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 20;
    this.y = 40;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the percentage of the coin bar and updates the displayed image based on the new percentage.
   * @param {number} percentage - The new percentage of coins collected, from 0 to 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.percentage = percentage * 10;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * This method selects the correct image to reflect the filled status of the coin bar.
   * @returns {number} Index of the image in the IMAGES array.
   */
  resolveImagesIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
      1;
    }
  }
}
