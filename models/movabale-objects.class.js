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
    if (this instanceof ThrowableObjekts) {
      return true;
    } else {
      return this.y < 120;
    }
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

  checkEndbossIndex() {
    this.bossIndex = world.level.enemies.length - 1;
  }

  taken() {
    this.coins++;
  }

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
