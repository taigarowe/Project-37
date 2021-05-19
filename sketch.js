var monk , monkey_running;
var ban ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup,ground;
var score=0,gamestate="play",sound,gameoverimg,edges,so;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png",
"sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  sound=loadSound("game-over.wav");
  gameoverimg=loadImage("gameover.png");
  so=loadSound("banana.wav");
 
}



function setup()
{
  createCanvas(1300,575);
  // edges=createEdgeSprites();
   monkey();
  
 ground=createSprite(0,displayHeight,2000,50);
 ground.shapeColor="green";

  //creating groups
  bananaGroup=createGroup();
  obstacleGroup=createGroup(); 
}


function draw() 
{
  camera.position.x = monk.x
  camera.position.y = monk.y;
background("black");
  if(gamestate=="play")
{ 
  //space
  if(keyDown("space") && monk.y>500 && gamestate=="play")
     {
     monk.velocityY=-10;
     }
  //gravity
  monk.velocityY=monk.velocityY+1;
  if(frameCount%150==0 && gamestate=="play")
  { 
    obstacles();
  }
  var rand=Math.round(random(100,200));
  if(frameCount%rand==0 && gamestate=="play")
     {
     banana();
     }
   
  if(bananaGroup.isTouching(monk) && gamestate=="play")
  {
    score=score+100;
    bananaGroup.destroyEach();
    so.play();
  }
  if(obstacleGroup.isTouching(monk) && gamestate=="play")
  {
     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();
      bananaGroup.setLifetimeEach();
     obstacleGroup.setLifetimeEach();
    gamestate="gameover";
    sound.play();
    //change
    monk.addImage("m",gameoverimg);
    monk.scale=1;
    monk.width=600;
    monk.height=600;
    monk.x=300;
    monk.y=300;
    score=0;
  }
}
  if((mousePressedOver(monk)) && gamestate=="gameover")
     {
       gamestate="play";
       //score=0;
       monk.addAnimation("m",monkey_running);
       monk.scale=0.2;
     }

  monk.collide(ground);
  drawSprites();
  fill("red");
  textSize(20);
  text("Score:"+score,10,50);
 
}

//creating monkey
function monkey()
{
   monk=createSprite(300,0,50,50);
   monk.addAnimation("m",monkey_running);
   monk.scale=0.2;
  
}
function obstacles()
{
  obstacle=createSprite(1300,650,50,50);
  obstacle.addImage("ob",obstacleImage);
  obstacle.velocityX=-(5+score/100);
  obstacleGroup.add(obstacle);
  obstacle.scale=0.2;
  obstacleGroup.setLifetime=100;
  
  obstacle.setCollider("rectangle",0,0,50,50);
}
function banana()
{
  var rand =Math.round(random(500,600))
  ban=createSprite(1300,rand,20,20);
  ban.addImage("b",bananaImage);
  ban.velocityX=-5;
  ban.scale=0.1;
  bananaGroup.add(ban);
  bananaGroup.setLifetime=120;
}