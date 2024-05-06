class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  lastThrow = 0;
  bottleHit = 0;
  bottleHitBoss = false;
  statusbar = new StatusBar();
  coinbar = new CoinBar();
  bottlebar = new BottleBar();
  throwableObjects = [];
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.checkCollisionBottle();
  }

  setWorld() {
    this.character.world = this;
  }
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  chicken_sound = new Audio("audio/singleChickenAlert.mp3");

  run() {
    setInterval(() => {
      this.throwBottle();
    }, 1000 / 60);

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
  }

  checkCollisionBottle() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
            // debugger;
            enemy.chickenDead();
            this.chicken_sound.play();
            this.bottleHitBoss = true;
            this.bottleHit++;
            if (this.bottleHit <= 1) {
              enemy.hitsLeft--;
              enemy.isHurt = true;
            }
            console.log("Chicken hit by bottle");

            setTimeout(() => {
              this.bottleHit = 0;
              this.bottleHitBoss = false;
            }, 700);
          }
        });
      });
    }, 20);
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

  characterLandsOnEnemy() {
    return this.character.speedY < 0;
  }

  // throwBottle() {
  //   setInterval(() => {
  //     if (this.keyboard.UP && this.time()) {
  //       console.log("Throw2");
  //       // debugger;
  //       // this.time();
  //       let bottle = new ThrowableObjekts(this.character.x, this.character.y);
  //       this.throwableObjects.push(bottle);
  //       this.lastThrow = new Date().getTime();
  //     }
  //   }, 1000 / 60);
  // }

  // time() {
  //   let timePassed = new Date().getTime() - this.lastThrow;
  //   timePassed = timePassed / 1000;
  //   return timePassed < 0.5;
  // }

  throwBottle() {
    if (this.keyboard.UP && this.time()) {
      console.log("Throw2");
      let bottle = new ThrowableObjekts(this.character.x + 135, this.character.y + 180);
      this.throwableObjects.push(bottle);
      this.lastThrow = new Date().getTime();
    }
  }

  time() {
    let timePassed = new Date().getTime() - this.lastThrow;
    timePassed = timePassed / 1000;
    return timePassed >= 0.7 || !this.lastThrow; // Erlaube den Wurf, wenn mehr als 0.5 Sekunden seit dem letzten Wurf vergangen sind oder wenn noch kein Wurf stattgefunden hat
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
    this.addObjectsToMap(this.throwableObjects);
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
