class Character extends MovableObject {
  height = 320;
  width = 200;
  y = 120;
  speed = 10;

  offset = {
    x: 25, // left
    y: 110, // top
    width: 30, // right
    height: 0, // bottom
  };
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = ["../img/2_character_pepe/4_hurt/H-41.png", "../img/2_character_pepe/4_hurt/H-42.png", "../img/2_character_pepe/4_hurt/H-43.png"];

  world;
  currentImage = 0;
  walking_sound = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > -590 && !this.isDead()) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }
      if (this.world.keyboard.SPACE && !this.isAbooveGround() && !this.isDead()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 80;
    }, 1000 / 25);

    setInterval(() => {
      if ((this.world.keyboard.RIGHT && !this.isAbooveGround()) || (this.world.keyboard.LEFT && !this.isAbooveGround())) {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 1000 / 12);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        console.log("dead");
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        console.log("hurt");
      } else if (this.isAbooveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 1000 / 8.5);
  }
}
