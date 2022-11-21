class Hud {
  constructor({ ship }) {
    this.ship = ship;

    this.glitchRectangles = [];
  }

  update() {
    if (this.ship.hp < this.ship.maxHp) {
      let n = (this.ship.maxHp - this.ship.hp) * 4;
      this.#buildGlitchRects(n);
    }
  }

  draw() {
    for (let gr of this.glitchRectangles) {
      gr.draw();
    }
  }

  #buildGlitchRects(number) {
    for (let i = 0; i < number; i++) {
      if (this.glitchRectangles.length === number) {
        // ...
      } else if (this.glitchRectangles.length < number) {
        this.glitchRectangles.push(new GlitchRect())
      } else if (this.glitchRectangles.length > number) {
        this.glitchRectangles.shift();
      }
    }
  }
}

class GlitchRect {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 8;
    this.color = random(this.colors);
  }

  get colors () {
    return [
      'red',
      'yellow',
      'white',
      'magenta',
      'cyan'
    ]
  }

  draw() {
    push();
      translate(random(-2, 2), random(-2, 2));
      noStroke();
      fill(this.color);
      rect(this.x, this.y, this.size);
    pop();
  }
}
