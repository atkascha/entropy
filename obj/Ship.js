class Ship {
  constructor() {
    this.#x = width / 2;
    this.#y = 0.75 * height;
    this.size = 20;

    this.maxHp = 5;
    this.hp = 4;

    this.position = createVector(this.x, this.y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector();

    this.stroke = color('black');
    this.fill = 200;

    this.lasers = [];
    this.lastFire = 0;
    this.coolDownTime = 250;
    this.canFire = true;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
    this.position.set(this.x, this.y);
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
    this.position.set(this.x, this.y);
  }

  #x;
  #y;

  // change to position based movement
  update({ currentEnemy }) {
    this.currentEnemy = currentEnemy;

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 7;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 7;
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 7;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 7;
    }

    // spacebar
    if (keyIsDown(32)) {
      this.fire();
    }

    this.#coolDown();
    this.#updateLasers();
    this.#noWrap();
    this.#updateAngle();
  }

  draw() {
    fill(this.fill);
    stroke(this.stroke);

    push();
      translate(this.x, this.y)
      rotate(this.angle)
      triangle(
        0 - this.size / 2, 0 + this.size / 2,
        0 + this.size / 2, 0 + this.size / 2,
        0, 0 - this.size / 2
      )
      line(0, 0, 0, -this.size)
    pop();

    this.#drawLasers();
  }

  fire() {
    if (this.canFire) {
      this.lasers.push(new Laser({
        position: this.position,
        angle: this.angle,
        enemy: this.currentEnemy
      }));

      this.lastFire = millis();
      this.canFire = false;
    }
  }

  #updateAngle() {
    // weird i need to subtract 90... but I *think* this has to do with p5js and me not being dumb
    this.angle = atan2(this.y - this.currentEnemy.y, this.x - this.currentEnemy.x) - 90;
  }

  #updateLasers() {
    for (let i = 0; i < this.lasers.length; i++) {
      let laser = this.lasers[i];

      laser.update();

      if (laser.isOutOfBounds) {
        this.lasers.splice(i, 1);
      }
    }
  }

  #noWrap() {
    if (this.x - this.size/2 < 0) {
      this.x = this.size/2;
    }

    if (this.x + this.size/2 > width) {
      this.x = width - this.size/2;
    }

    if (this.y + this.size/2 > height) {
      this.y = height - this.size/2;
    }

    if (this.y - this.size/2 < 0) {
      this.y = this.size/2;
    }
  }

  #coolDown() {
    if (millis() - this.lastFire > this.coolDownTime) {
      this.canFire = true;
    }
  }

  #drawLasers() {
    for (let i = 0; i < this.lasers.length; i++) {
      this.lasers[i].draw();
    }
  }
}
