class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  throwableObjects;
  level_end_x = 720 * 3 + 50;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, statusbar, coinbar, bottlebar, smallChicken, throwableObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.statusbar = statusbar;
    this.coinbar = coinbar;
    this.bottlebar = bottlebar;
    this.smallChicken = smallChicken;
    this.throwableObjects = throwableObjects;
  }
}
