var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;


var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {

  monkey = createSprite(80,315);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.visible = true;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
}


function draw() {
  createCanvas(400, 400);
  background(255);
  
  text("Score: " + score, 200, 50);
  
  if(gameState === PLAY){
    if(keyDown("space") && monkey.y >= 310){
      monkey.velocityY = -12;
    }
   
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.visible = false;
      gameState = END;
    }
    createRock();
    createFood();
  }
  if(gameState === END){
    text("GAME OVER!",200, 200);
  }

  if(ground.x<0) {
    ground.x = ground.width/2; 
  }
  monkey.velocityY = monkey.velocityY + 0.8;  
  monkey.collide(ground);
  drawSprites();
}

function createRock(){
  if(World.frameCount%60 === 0){
    var oImage = createSprite(400,330,20,20);
    oImage.addImage(obstacleImage);
    oImage.velocityX=-8;
    oImage.setLifetime = 50;
    oImage.scale = 0.1;
  
  
    obstacleGroup.add(oImage)
  }
}

function createFood(){
  if(World.frameCount%40 === 0){
    var fImage = createSprite(400,200,20,20);
    fImage.addImage(bananaImage);
    fImage.velocityX=-8;
    fImage.setLifetime = 50;
    fImage.scale = 0.1;
  
  
    FoodGroup.add(fImage)
  }
}