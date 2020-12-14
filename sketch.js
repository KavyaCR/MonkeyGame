var monkey, monkey_running, stopMonkey;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, background;

function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  stopMonkey = loadImage("gameOver.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800, 600);

  var survivalTime = 0;

  //creating monkey
  monkey = createSprite(80, 450, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.3;

  ground = createSprite(400, 600, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  ground.visible = false;
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  game();
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.2;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 500, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.3;

    //lifetime to the obstacle
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function game()
{
  background("PaleVioletRed");
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  
  stroke("black");
  textSize(18);
  fill("cyan");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : " + survivalTime, 130, 50);

  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
    backGround = createSprite(400,300);
    backGround.addImage("stop", stopMonkey);
    backGround.scale = 4;
  }

  monkey.collide(ground);
  
  spawnFood();
  
  spawnObstacles();

  drawSprites();
}
