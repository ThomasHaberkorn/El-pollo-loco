/**
 * Represents a keyboard state manager in the game. This class tracks the state of various keyboard keys
 * to control game elements, such as movement and actions of characters or other interactive objects.
 *
 * @class
 * @extends MovableObject
 */
class Keyboard extends MovableObject {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  constructor() {
    super();
  }
}
