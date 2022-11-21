class Config {
  constructor() {
    this.frameRate = 30;
  }

  setup() {
    frameRate(this.frameRate);
    cursor(CROSS);
  }

  run() {
    angleMode(DEGREES);
    background(200);
    textStyle(NORMAL);
    noStroke();
    noFill();
  }
}
