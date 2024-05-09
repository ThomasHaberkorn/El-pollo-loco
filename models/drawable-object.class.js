/**
 * Base class for all drawable objects in the game. Provides common functionality for loading images,
 * drawing them to a canvas, and animating them if necessary.
 *
 * @class
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 290;
  height = 150;
  width = 100;

  /**
   * Loads an image from a specified path and sets it as the object's current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log("Error while drawing image", e);
    }
  }

  /**
   * Preloads a set of images for use in animations and stores them in the image cache.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation sequence by cycling through a list of images.
   * @param {string[]} images - An array of image paths that form the animation sequence.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Optionally draws a frame around the object if it is an instance of certain classes.
   * This method is typically used for debugging to visualize the bounding box of the object.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
