/**
 * Represents a cloud in the game's background, providing visual depth and atmosphere.
 * Clouds move across the screen to simulate environmental effects and add to the game's aesthetic.
 *
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  width = 500;
  height = 250;

  /**
   * Initializes a new instance of the Cloud class.
   * Sets up the cloud's appearance and initial position, and begins its animation.
   */
  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = -200 + Math.random() * 2800;
    this.y = 0 + Math.random() * 60;
    this.animate();
  }

  /**
   * Animates the cloud by moving it left at a constant speed.
   * The movement is controlled by a timer that updates every frame (approx. 60fps).
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
