/**
 * Represents a status bar that displays a percentage value visually through a series of images.
 * Each image represents a range of percentage values. This class is often used to show player or
 * enemy health in a game.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Constructs a new instance of StatusBar, initializing its default state and loading its images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the percentage value for the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage value to set (from 0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * This method maps percentage ranges to specific images.
   * @returns {number} The index of the image in the IMAGES array that corresponds to the current percentage.
   */
  resolveImagesIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
