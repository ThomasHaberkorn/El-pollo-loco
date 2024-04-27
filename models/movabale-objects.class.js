class MovableObject {
  x = 120;
  y = 290;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAbooveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
    // this.y = 120;
  }

  isAbooveGround() {
    return this.y < 120;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 45;
    this.jumping_sound.play();
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  hit() {
    this.energy -= 5;
    console.log("Hit", this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy === 0;
  }

  isColliding(obj) {
    // return (
    //   this.x + this.width >= obj.x &&
    //   this.x <= obj.x + obj.width &&
    //   this.y + this.offsetY + this.height >= obj.y &&
    //   this.y + this.offsetY <= obj.y + obj.height &&
    //   obj.onCollisionCourse
    // );
    return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.height >= obj.y && this.y <= obj.y + obj.height;

    // return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.offsetY + this.height >= obj.y && this.y + this.offsetY <= obj.y + obj.height;

    // obj.onCollisionCourse
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }
}
