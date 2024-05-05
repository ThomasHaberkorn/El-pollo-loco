const level1 = new Level(
  [new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [new Cloud(), new Cloud(), new Cloud()],
  [
    new BackgroundObject("../img/5_background/layers/air.png", -719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("../img/5_background/layers/air.png", 0),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/air.png", 719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("../img/5_background/layers/air.png", 717 * 2),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 717 * 2),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 717 * 2),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 717 * 2),
    new BackgroundObject("../img/5_background/layers/air.png", 717 * 3),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 717 * 3),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 717 * 3),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 717 * 3),
  ],
  [new Coin()],
  [new Bottle()],
  [new StatusBar()],
  [new CoinBar()],
  [new BottleBar()],
);
// new Chicken(), new Chicken(), new Chicken(), new Chicken(),
// , new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()

// , new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()
