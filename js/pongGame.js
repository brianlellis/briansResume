
var paddle1, 
    paddle2, 
    scoreP1, 
    scoreP2, 
    p1c = 0, 
    p2c = 0, 
    gameBall, 
    worldHit = window.innerWidth * window.devicePixelRatio - 18, 
    worldHeight = 500,
    gameStop = true, gameTxt,hitCount = 50;

var game = new  Phaser.Game( 
                  worldHit,
                  worldHeight, 
                  Phaser.AUTO,
                  'phaser-example', 
                  { preload: preload, create: create, update: update }
                );

function preload () {
  game.load.image('background', '../media/phaser/gameBG.png');
  game.load.image('paddle', '../media/phaser/gamePaddle.png');
  game.load.image('gameBegin', '../media/phaser/begin.png');
  game.load.spritesheet('gameBall', '../media/phaser/gameBall.png', 46,46);
}
function create () {
  // Game scene decoration
  gameBG = game.add.image(game.world.centerX, game.world.centerY, 'background');
  gameBG.anchor.set(0.5);
  gameBG.width = game.width;

  // Game assets
  paddle1 = createPaddle(0, game.world.centerY);
  paddle2 = createPaddle(game.world.width, game.world.centerY);
  gameBall = createBall(game.world.centerX, game.world.centerY);
  
  scoreP1 = game.add.text(15, 0, 'player 1: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  scoreP2 = game.add.text(worldHit - 110, 0, 'player 2: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
  gameTxt = game.add.sprite(game.world.centerX, game.world.centerY, 'gameBegin').anchor.set(0.5);
}
function update () {
  // START GAME
  if (game.input.activePointer.isDown && gameStop === true) {
    gameTxt.x = 1000;
    gameBall.body.velocity.x = 500;
    gameBall.body.velocity.y = 30;
  }

  controlPaddle(paddle1, game.input.y);

  game.physics.arcade.collide(paddle1, gameBall, hitter);
  game.physics.arcade.collide(paddle2, gameBall, hitter);
  
  if (paddle2.y < gameBall.y) {
    paddle2.y = gameBall.y - hitCount;
  } else {
    paddle2.y = gameBall.y + hitCount;
  }
  
  // score keeper
  if (gameBall.x < 46) {
    p2c+=1;
    scoreP2.text = 'player 2: '+p2c;
    resetBall();
  } else if (gameBall.x > worldHit - 46) {
    p1c+=1;
    scoreP1.text = 'player 1: '+p1c;
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
  var ball = game.add.sprite(x, y, 'gameBall');
  ball.anchor.setTo(0.5,0.5);
  game.physics.arcade.enable(ball);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.setTo(1,1);
  ball.body.velocity.x = 0;
  ball.body.velocity.y = 0; 

  // Game ball animation
  ball.animations.add('spinning');

  //  And this starts the animation playing by using its key ("run")
  //  15 is the frame rate (15fps)
  //  true means it will loop when it finishes
  ball.animations.play('spinning', 15, true);

  return ball;
}
function resetBall() {
  gameStop = true;
  gameTxt.x = 0.5;
  hitCount = 0;
  gameBall.body.velocity.x = 0;
  gameBall.body.velocity.y = 0;
  gameBall.x = game.world.centerX;
  gameBall.y = game.world.centerY;
  paddle1.x = 16;
}
