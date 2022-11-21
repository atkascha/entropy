let isDebugging = true;
let levels;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  isDebugging ? console.log('debug mode') : null;

  levels = [
    new Level({
      enemies: [
        new Enemy({ size: 20, x: width/2, y: height/2 }),
      ],
      entities: []
    })
  ];

  game = new Game({ levels: levels });

  game.config.setup();
}

function draw() {
  game.config.run();

  game.update();

  game.draw();

  isDebugging ? debug() : null;
}

function debug() {
  if (game.tutorial.isComplete) {
    let s = game.ship;
    fill('black');
    textSize(12);
    text(s.angle, s.x, s.y + 20);

    for (let i = 0; i < game.currentLevel.enemies.length; i++) {
      let e = game.currentLevel.enemies[i];
      stroke(100);
      line(s.x, s.y, e.x, e.y);
    }
  }
}
