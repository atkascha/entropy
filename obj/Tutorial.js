class Tutorial {
  constructor() {
    this.isComplete = false;
  }

  complete() {
    this.isComplete = true;
  }

  update() {
  }

  draw() {
    textAlign(CENTER)
    fill(0);
    textStyle(ITALIC);
    push();
    translate(random(-1, 1), random(-1, -1))
    textSize(18)
    text('E N T R O P Y', width / 2, height / 2 - 20);
    pop();
    textSize(12);
    text('Use WASD or Arrow Keys to move', width / 2, height / 2 + 20);
    text('Use MOUSE or SHIFT to switch targets', width / 2, height / 2 + 40);
    text('Press/Hold SPACEBAR to fire', width / 2, height / 2 + 60);
    text('Press ENTER to Start', width / 2, height / 2 + 100);
  }
}
