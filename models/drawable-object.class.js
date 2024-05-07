class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 290;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  // drawCollisionFrame(ctx) {
  //   if (this instanceof Character || this instanceof Bottle || this instanceof Endboss) {
  //     ctx.beginPath();
  //     ctx.lineWidth = "1";
  //     ctx.strokeStyle = "red";
  //     // ctx.rect(this.x + 50, this.y + 50, this.width - 100, this.height - 100);
  //     ctx.rect(
  //       this.x + this.offset.x,
  //       this.y + this.offset.y,
  //       this.x + this.width - this.offset.width - (this.x + this.offset.x),
  //       this.y + this.height - this.offset.height - (this.y + this.offset.y),
  //     );

  //     ctx.stroke();
  //   }
  // }
}
