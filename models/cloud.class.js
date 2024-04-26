class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = -200 + Math.random() * 2800;
    this.y = 0 + Math.random() * 60;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
