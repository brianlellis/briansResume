var paddle1, paddle2, scoreP1, scoreP2, p1c = 0, p2c = 0, gameBall, worldHit = 600, gameStop = true, gameTxt,hitCount = 50;

var game = new Phaser.Game(worldHit,300, Phaser.AUTO,'', { preload: preload, create: create, update: update });

function preload () {
}
function create () {
  paddle1 = createPaddle(0, game.world.centerY);
  paddle2 = createPaddle(game.world.width, game.world.centerY);
  gameBall = createBall(game.world.centerX, game.world.centerY);
  
  scoreP1 = game.add.text(10, 0, 'pl 1: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  scoreP2 = game.add.text(worldHit - 80, 0, 'pl 2: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  gameTxt = game.add.text(game.world.centerX - 40, 100, '--BEGIN--', { font: "20px Arial", fill: "#ffffff", align: "center" });
  
  enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  enterKey.onDown.add(function () {
    if (gameStop === true) {
      gameTxt.kill();
      gameBall.body.velocity.x = 500;
      gameBall.body.velocity.y = 30;
    }
  });
}
function update () {
  controlPaddle(paddle1, game.input.y);

  game.physics.arcade.collide(paddle1, gameBall, hitter);
  game.physics.arcade.collide(paddle2, gameBall, hitter);
  
  if (paddle2.y < gameBall.y) {
    paddle2.y = gameBall.y - hitCount;
  } else {
    paddle2.y = gameBall.y + hitCount;
  }
  
  // score keeper
  if (gameBall.x < 17) {
    p2c+=1;
    scoreP2.text = 'pl 1: '+p2c;
    resetBall();
  } else if (gameBall.x > worldHit - 17) {
    p1c+=1;
    scoreP1.text = 'pl 1: '+p1c;
    resetBall();
  }
  gameBall.body.bounce.setTo(1,1);
  paddle2.x = game.world.width - 15; // offset of width
  paddle1.x = 16;
}
function hitter () {
  if (gameBall.body.velocity.y < game.world.centerY) {
    gameBall.body.velocity.y -= 40;
  } else {
    gameBall.body.velocity.y += 40;
  }
  if (gameBall.body.velocity.x < game.world.centerX) {
    gameBall.body.velocity.x -= 30;
  } else {
    gameBall.body.velocity.x += 30;
  }
  hitCount++;
}
function createPaddle (x, y, speed) {
  var paddle = game.add.sprite(x, y, 'paddle');
  paddle.anchor.setTo(0.5,0.5);
  game.physics.arcade.enable(paddle);
  paddle.body.collideWorldBounds = true;
  paddle.body.checkCollision.right = true;
  if (speed) paddle.body.speed = 2;
  paddle.body.bounce.setTo(1,1);  
  return paddle;
}
function controlPaddle(paddle, y) {
  paddle.y = y;
  
  if (paddle.y < paddle.height / 2) {
    paddle.y = paddle.height / 2
  } else if (paddle.y > game.world.height - paddle.height / 2) {
    paddle.y = game.world.height - paddle.height / 2;
  }
}
function createBall (x, y) {
  var ball = game.add.sprite(x, y, 'ball');
  ball.anchor.setTo(0.5,0.5);
  game.physics.arcade.enable(ball);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.setTo(1,1);
  ball.body.velocity.x = 0;
  ball.body.velocity.y = 0; 
  return ball;
}
function resetBall() {
  gameStop = true;
  gameTxt = game.add.text(game.world.centerX - 40, 100, '--BEGIN--', { font: "20px Arial", fill: "#ffffff", align: "center" });
  hitCount = 0;
  gameBall.body.velocity.x = 0;
  gameBall.body.velocity.y = 0;
  gameBall.x = game.world.centerX;
  gameBall.y = game.world.centerY;
  paddle1.x = 16;
}
