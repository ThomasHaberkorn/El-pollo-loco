class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  bottles = 0;
  coins = 0;

  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAbooveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isAbooveGround()) {
        this.speedY = 0;
        this.y = 120;
      }
    }, 1000 / 25);
  }

  isAbooveGround() {
    return this.y < 120;
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

  hit() {
    this.energy -= 0.15;
    // console.log("Hit", this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  coinJump() {
    this.y = 100;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }

  isDead() {
    return this.energy === 0;
  }

  taken() {
    this.coins++;
  }

  // chickenDead() {
  //   return true;
  // }

  isColliding(obj) {
    return this.x + this.width - this.offset.x >= obj.x && this.x <= obj.x + obj.width && this.y + this.height - this.offset.height >= obj.y && this.y <= obj.y + obj.height;
  }
  isCollidingItem(obj) {
    return (
      this.x + this.width - this.offset.x >= obj.x + obj.offset.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offset.y <= obj.y + obj.height - obj.offset.height &&
      this.y + this.height >= obj.y
    );
  }
}

// this.x + this.width - this.offset.x >= obj.x + obj.offset.x &&
// this.x <= obj.x + obj.width &&
// this.y + 200 + this.height >= obj.y &&
// this.y + this.offset.x <= obj.y + obj.height - obj.offset.height

// return (
//   this.x + this.width >= obj.x &&
//   this.x <= obj.x + obj.width &&
//   this.y + this.offsetY + this.height >= obj.y &&
//   this.y + this.offsetY <= obj.y + obj.height &&
//   obj.onCollisionCourse
// );

// return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.offsetY + this.height >= obj.y && this.y + this.offsetY <= obj.y + obj.height;

// obj.onCollisionCourse
// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
