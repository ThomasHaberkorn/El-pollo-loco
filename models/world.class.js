class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  chicken_sound = new Audio("audio/singleChickenAlert.mp3");
  // checkCollisions() {
  //   setInterval(() => {
  //     this.level.enemies.forEach((enemy) => {
  //       if (this.character.isColliding(enemy)) {
  //         this.character.hit();
  //         this.statusbar.setPercentage(this.character.energy);
  //         console.log("Collision with character", this.character.energy);
  //       }
  //     });
  //   }, 200);
  // }
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (this.characterLandsOnEnemy(enemy)) {
            enemy.chickenDead();
            this.chicken_sound.play();
            enemy.isAlive = false;
            console.log("Chicken hit by character");
          } else if (enemy.isAlive == true) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
            console.log("Collision with character", this.character.energy);
          }
        }
      });
    }, 20);

    setInterval(() => {
      [this.level.bottles, this.level.coins].forEach((items) => {
        items.forEach((item, index) => {
          if (this.character.isCollidingItem(item)) {
            if (item === this.level.bottles[index]) {
              this.addBottle(index);
              // console.log("bottle taken", this.character.bottles);
            } else {
              this.addCoin(index);
              // console.log("index", index);
              // console.log("Coin taken", this.character.coins);
              // console.log("item", item);
              // console.log("items", items);
            }
          }
        });
      }, 20);
    });
  }

  addCoin(index) {
    this.coin_sound.play();
    this.level.coins.splice(index, 1);
    this.character.coins++;
    this.coinbar.setPercentage(this.character.coins);
  }

  addBottle(index) {
    this.bottle_sound.play();
    this.level.bottles.splice(index, 1);
    this.character.bottles++;
    this.bottlebar.setPercentage(this.character.bottles);
  }

  //   checkCollisionWithItems() {
  //     [this.level.bottles, this.level.coins].forEach(items => {
  //         items.forEach((item, index) => {
  //             if (this.character.isColliding(item)) {
  //                 if (items === this.level.bottles) {
  //                     this.addbottle(index)
  //                 } else {
  //                     this.addCoin(index);
  //                 }
  //             }
  //         });
  //     });
  // }

  characterLandsOnEnemy() {
    return this.character.speedY < 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // --------  space for fixed objects ---------
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawCollisionFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
