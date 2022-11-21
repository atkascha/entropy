class Enemy {
  constructor({ size, x, y }) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.position = createVector(this.x, this.y);

    this.hp = 10;
    this.lockedOn = false;

    this.hoverOutline = 0;

    this.fill = 'black'
  }

  get isHovering() {
    let d = dist(mouseX, mouseY, this.x, this.y)

    return d < this.size;
  }

  fire() {
    this.orbs.push()
  }

  update() {
    if (this.isHovering) {
      debugger
      this.hoverOutline++
      if (this.hoverOutline > this.size/2) {
        this, this.hoverOutline = 0
      }
    }

    if (this.lockedOn) {
      this.fill = 'red'
    } else {
      this.fill = 'black'
    }
  }

  draw() {
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.size);

    if (this.isHovering) {
      noFill();
      stroke(this.fill);
      ellipse(this.x, this.y, 2 * this.size + this.hoverOutline);
    }
  }
}
