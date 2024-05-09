/**
 * Represents a collectible bottle object in the game. The bottle can appear at various horizontal positions
 * within the game world, providing variability in gameplay.
 *
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /**
   * Default dimensions and position for bottle objects.
   */
  height = 80;
  width = 80;
  y = 350;
  x = 300;

  /**
   * Hitbox offset for collision detection. Adjusts the effective area for interacting with game elements.
   */
  offset = {
    x: 20, // left
    y: 10, // top
    width: 15, // right
    height: 0, // bottom
  };

  IMAGES_WALKING = ["../img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  /**
   * Initializes a new instance of the Bottle class with random image selection and position.
   * This randomness adds an element of unpredictability to the game.
   */
  constructor() {
    super();
    let randomImage = this.IMAGES_WALKING[Math.floor(Math.random() * this.IMAGES_WALKING.length)];
    this.loadImage(randomImage);
    this.x = 250 + Math.random() * 1800;
    this.y = 350 + Math.random() * 20;
  }
}
