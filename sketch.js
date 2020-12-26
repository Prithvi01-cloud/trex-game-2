var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var s = 600
var score = 0;

var gameOver, restart;

localStorage['HighestScore'] = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  img = loadImage("gameOver.png")
  img2 = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle", 0, 0, 30);

  restart = createSprite(300, 120)
  restart.addImage(img2)
  restart.scale = 0.3
  restart.visible = false;

  gameOver = createSprite(300, 100)
  gameOver.addImage(img)
  gameOver.scale = 0.5
  gameOver.visible = false

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
ground.x = ground.width / 2;
 // ground.velocityX = -(6 + 3 * score / 100);

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(250);
  trex.debug = true;
  text("Score: " + score, 500, 50);
  if (gameState) {
    score = score + Math.round(getFrameRate() / 60);


    if (keyDown("space") && trex.y >= 159) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.7

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup)) {
      gameState = END
    }
  } else if (gameState === END) {

    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    ground.velocityX=0
    restart.visible=true
    gameOver.visible=true
    trex.changeAnimation("collided",trex_collided)
    if(mousePressedOver(restart)){
    reset();
    }
    
    
  }
if (score<=99999){
  trex.x = score
inivisbleGround = score
  trex.collide(invisibleGround);
  camera.position.x = score}
  drawSprites();
  s + 100
} 
 if(score>=9999)
{ gameState = END}

function reset (){
gamestate=PLAY
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
 trex.changeAnimation("running",trex_running)
if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;

}





function spawnClouds() {
  //write code here to spawn the clouds

    var cloud = createSprite(s, 100, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
   

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);


}

function spawnObstacles() {
  
    var obstacle = createSprite(s, 165, 10, 40);


    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
}