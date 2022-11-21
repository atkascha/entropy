class Level {
  constructor({ enemies, entities }) {
    this.enemies = enemies;
    this.entities = entities;

    this.enemyId = 0;
    this.enemies[this.enemyId].lockedOn = true;
    this.countdown = 3;
    this.stateIndex = 0;

    this.fill = color(255);
  }

  get state() {
    return {
      0: 'not_started',
      1: 'in_progress',
      2: 'complete'
    }[this.stateIndex];
  }

  get lockedOnEnemy() {
    return this.enemies[this.enemyId];
  }

  get countdownComplete() {
    return this.countdown <= 0;
  }

  load() {
    this.startTime = millis();
  }

  nextEnemy() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].lockedOn = false;
    }

    this.enemyId++;

    if (this.enemyId > this.enemies.length - 1) {
      this.enemyId = 0;
    }

    this.enemies[this.enemyId].lockedOn = true;
  }

  update() {
    if (this.countdown > 0) {
      this.#updateCountdown();
    }

    this.#updateEnemies();
    this.#updateEntities();
  }

  draw() {
    if (this.countdown > 0) {
      this.#drawCountdown()
    }

    this.#drawEnemies();
    this.#drawEntities();
  }

  #updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    }
  }

  #updateEntities() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
  }

  #updateCountdown() {
    console.log('hello')
  }

  #drawEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }

  #drawEntities() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
  }

  #drawCountdown() {
    textSize(96);
    textStyle(ITALIC);
    noStroke();
    fill(this.fill);
    text(this.countdown, width/2, height/4);
  }
}
