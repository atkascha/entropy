class Laser {
  constructor({ position, angle, enemy }) {
    this.position = createVector(position.x, position.y);
    // this.angle = this.position.angleBetween(enemy.position);
    this.angle = angle + 4;
    this.enemy = enemy;

    this.speed = 5;
    this.velocity = p5.Vector.fromAngle(this.angle);
    this.velocity.mult(this.speed);
    this.fill = color('orange');
  }

  get isOutOfBounds() {
    if (
      this.position.x > width  ||
      this.position.x < 0      ||
      this.position.y > height ||
      this.position.y < 0
    ) {
      return true;
    }

    return false;
  }

  update() {
    this.position.add(this.velocity);
  }

  draw() {
    push();
      noStroke();
      fill(this.fill);
      translate(this.position.x, this.position.y)
      rotate(this.angle + 30);
      rect(0, 0, 4, 8);

      fill(0)
      text(this.angle, 0, 0)
    pop();
  }
}
