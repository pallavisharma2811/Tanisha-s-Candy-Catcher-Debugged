var backgroundImg;
var Candy1, Candy2, Candy3, Candy4, Candy5, Candy6, Candy7;
var obstacle1, obstacle2, obstacle3;
var candy, obstacle;
var rand;
var randPosX;
var player, playerImg;
var candiesGroup;
var score = 0;
var invisibleGround;
var gameState = 1;

var notCollected = [];

function preload() {
  backgroundImg = loadImage("./images/Background.jpg");

  Candy1 = loadImage("./images/Candy1.png");
  Candy2 = loadImage("./images/Candy2.png");
  Candy3 = loadImage("./images/Candy3.png");
  Candy4 = loadImage("./images/Candy4.png");
  Candy5 = loadImage("./images/Candy5.png");
  Candy6 = loadImage("./images/Candy6.png");
  Candy7 = loadImage("./images/Candy7.png");

  obstacle1 = loadImage("./images/Obstacle1.png");
  obstacle2 = loadImage("./images/Obstacle2.png");
  obstacle3 = loadImage("./images/Obstacle3.png");

  playerImg = loadImage("./images/player.jpg");



}
function setup() {
  createCanvas(displayWidth, displayHeight);
  player = createSprite(displayWidth / 2, displayHeight - 200);
  player.addImage(playerImg);
  player.scale = 0.5
  player.debug = false;
  player.setCollider("circle", 60, 130, 50);

  candiesGroup = new Group()


  invisibleGround = createSprite(displayWidth / 2, displayHeight, displayWidth, 20);
  invisibleGround.visible = false;
}


function draw() {
  background(backgroundImg);

  if (gameState === 1) {

    if (keyDown("left")) {
      player.x = player.x - 4;
    }
    if (keyDown("right")) {
      player.x = player.x + 4;
    }

    if (candiesGroup.isTouching(player)) {
      candiesGroup.destroyEach();
      score = score + 1;
    }
    else if (candiesGroup.isTouching(invisibleGround)) {
      candiesGroup.destroyEach()

      notCollected.push(candiesGroup.get());
    }

    if (notCollected.length === 5) {
      gameState = 0;
    }

    spawnCandy();

  } else if (gameState === 0) {
    stroke("black");
    fill("black")
    textSize(30);
    text("You have dropped 5 Candies, Press r to restart!", displayWidth / 2 - 300, displayHeight / 2);

    if (keyDown("r")) {
      notCollected = [];
      gameState = 1;
      score = 0;
    }

  }

  drawSprites();
  stroke("black");
  fill("black")
  textSize(30);
  text("Score: " + score, displayWidth - 300, 48);

}
function spawnCandy() {
  if (frameCount % 150 === 0) {
    candy = createSprite(50, 70, 50, 50);
    randPosX = Math.round(random(100, displayWidth - 100));
    candy.velocityY = 4
    candy.x = randPosX;
    rand = Math.round(random(1, 7))
    switch (rand) {
      case 1: candy.addImage(Candy1); break;
      case 2: candy.addImage(Candy2); break;
      case 3: candy.addImage(Candy3); break;
      case 4: candy.addImage(Candy4); break;
      case 5: candy.addImage(Candy5); break;
      case 6: candy.addImage(Candy6); break;
      case 7: candy.addImage(Candy7); break;
      default: break;
    }


    candy.scale = 0.3;
    candiesGroup.add(candy);
  }

}
