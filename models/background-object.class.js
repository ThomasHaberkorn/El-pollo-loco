/**
 * Represents a background object in the game. Extends `MovableObject` to include movement capabilities.
 * Each instance of this class represents a visual element placed at a specific position in the game's background.
 *
 * @class
 * @extends MovableObject
 * @param {string} imagePath - Path to the image file for the background object.
 * @param {number} x - The horizontal starting position of the background object.
 */
class BackgroundObject extends MovableObject {
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.width = 720;
    this.height = 480;
    this.x = x;
    this.y = 480 - this.height;
  }
}
