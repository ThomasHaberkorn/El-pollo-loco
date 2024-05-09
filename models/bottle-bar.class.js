/**
 * Represents a status bar for bottles in the game, showing the current number of bottles collected as a percentage.
 * This class handles the visual representation of the bottle status bar, updating its appearance based on the
 * percentage of bottles collected.
 *
 * @class
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {
  /**
   * Pre-defined image paths for different fill levels of the bottle bar.
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 100;

  /**
   * Initializes a new instance of the BottleBar class.
   * Loads images for the status bar and sets the initial display properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 20;
    this.y = 80;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the percentage of the bottle bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage of bottles collected, from 0 to 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.percentage = percentage * 10;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * This helps in selecting the correct image that reflects the filled status of the bottle bar.
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
