class BottleBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(0);
    this.x = 20;
    this.y = 80;
    this.width = 200;
    this.height = 50;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    this.percentage = percentage * 10;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
    console.log("percentBottle", this.percentage);
  }

  resolveImagesIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
      1;
    }
  }
  // setPercentage(percentage) {
  //   this.percentage = percentage;
  //   let path = this.IMAGES[this.resolveImagesIndex()];
  //   this.img = this.imageCache[path];
  // }

  // resolveImagesIndex() {
  //   if (this.percentage == 100) {
  //     return 5;
  //   } else if (this.percentage > 80) {
  //     return 4;
  //   } else if (this.percentage > 60) {
  //     return 3;
  //   } else if (this.percentage > 40) {
  //     return 2;
  //   } else if (this.percentage > 20) {
  //     return 1;
  //   } else {
  //     return 0;
  //     1;
  //   }
  // }
}
