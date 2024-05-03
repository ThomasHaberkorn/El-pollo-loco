class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 720 * 3 + 100;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, statusbar, coinbar, bottlebar) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.statusbar = statusbar;
    this.coinbar = coinbar;
    this.bottlebar = bottlebar;
  }
}
