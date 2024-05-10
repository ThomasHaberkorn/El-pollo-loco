/**
 * Represents a game level with its associated entities such as enemies, clouds, background objects,
 * coins, bottles, and various bars for status indicators. This class is responsible for holding the state
 * and composition of a level in the game.
 *
 * @class
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  throwableObjects;
  level_end_x = 720 * 3 + 50;

  /**
   * Initializes a new instance of the Level class, setting up the level's components.
   * @param {MovableObject[]} enemies - Array of enemy objects in the level.
   * @param {MovableObject[]} clouds - Array of cloud objects for background animation.
   * @param {DrawableObject[]} backgroundObjects - Array of static or dynamic background objects.
   * @param {MovableObject[]} coins - Array of collectible coins.
   * @param {MovableObject[]} bottles - Array of collectible bottles.
   * @param {DrawableObject} statusbar - The status bar showing player health or other metrics.
   * @param {DrawableObject} coinbar - The bar displaying the number of collected coins.
   * @param {DrawableObject} bottlebar - The bar displaying the number of collected bottles.
   * @param {MovableObject} smallChicken - Special case enemy or object.
   * @param {MovableObject[]} throwableObjects - Array of objects that can be thrown by the player.
   */

  constructor(enemies, clouds, backgroundObjects, coins, bottles, statusbar, coinbar, bottlebar, smallChicken, throwableObjects, bossbar) {
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
    this.bossbar = bossbar;
  }
}
