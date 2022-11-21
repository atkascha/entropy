class Game {
  constructor({ levels }) {
    this.config = new Config();

    this.levelId = 0;
    this.timeAdjust = 1;
    this.ship = new Ship();
    this.hud = new Hud({ ship: this.ship })

    this.levels = levels;
    this.tutorial = new Tutorial();
  }

  get currentLevel() {
    return this.levels[this.levelId];
  }

  update() {
    if (this.tutorial.isComplete) {
      if (this.currentLevel.countdownComplete) {
        this.ship.update({ currentEnemy: this.currentLevel.lockedOnEnemy });
        this.currentLevel.update();
        this.hud.update()
      }
    } else {
      this.tutorial.update();
    }
  }

  draw() {
    if (this.tutorial.isComplete) {
      this.ship.draw();
      this.currentLevel.draw();
      this.hud.draw();
    } else {
      this.tutorial.draw();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < game.currentLevel.enemies.length; i++) {
    let enemy = game.currentLevel.enemies[i];
    enemy.lockedOn = false;
    let d = dist(mouseX, mouseY, enemy.x, enemy.y);

    if (d < enemy.size) {
      game.currentLevel.enemyId = i;
      enemy.lockedOn = true;
    }
  }
}

// ...
function keyReleased() {
  if (key === 'Shift') {
    game.currentLevel.nextEnemy();
  } else if (!game.tutorial.isComplete && key === 'Enter') {
    game.tutorial.complete();
  }

  return false;
}
