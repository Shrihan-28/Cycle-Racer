var path,mainCyclist, player1,player2,player3;
var pathImg,mainCyclistImg1,mainCyclistImg2;
var opp1,opp2,opp3,opp4,opp5,opp6;
var obstaclesGroup,obstacle1,obstacle2,obstacle3;

var END=0;
var PLAY=1;
var gameState= PLAY;

var distance=0
var PinkCG,RedCG,YellowCG;
var gameOverImg,gameOver
var sound

function preload(){
pathImg=loadImage("images/Road.png")
 mainCyclistImg1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png")
  mainCyclistImg2=loadAnimation("images/mainPlayer3.png")
  
  opp1=loadAnimation("images/opponent1.png","images/opponent2.png")
  opp2=loadAnimation("images/opponent3.png")
  
  opp3=loadAnimation("images/opponent4.png","images/opponent5.png")
  opp4=loadAnimation("images/opponent6.png")
  opp5=loadAnimation("images/opponent7.png","images/opponent8.png")
  opp6=loadAnimation("images/opponent9.png")
  
  obstacle1=loadImage("images/obstacle1.png")
  obstacle2=loadImage("images/obstacle2.png")
  obstacle3=loadImage("images/obstacle3.png")
  gameOverImg=loadImage("images/gameOver.png")
  sound=loadSound("sound/bell.mp3")
  
}

function setup(){
  createCanvas(650,350);
   edges= createEdgeSprites();
//Moving Background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX=-5
  //mainCyclist 
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainCyclistImg1);
  mainCyclist.addAnimation("SahilCollided",mainCyclistImg2);
  mainCyclist.scale=0.07;
  // gameOver
  gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
     gameOver.scale = 0.5;
      gameOver.visible=false
  
  
  PinkCG = new Group();
  RedCG =  new Group();
  YellowCG =  new Group();
  obstaclesGroup = new Group();
  

distance=0;
  mainCyclist.setCollider("rectangle",00,00,400,400);
  mainCyclist.debug = true;
 
} 

function draw(){
  background("grey");
  textSize(20);
  fill(255)
  //mainCyclist.debug = true;
 //text("Distance: "+ distance, 500,50);
     edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //mainCyclist.setCollider("rectangle",400,400,400,400)
  
  if (gameState===PLAY){
    distance = distance + Math.round(getFrameRate()/60);
    path.velocityX = -(6 + 3*distance/100);
  
 //   if(keyDown("space") ) {
    //  trex.velocityY = -12;
    //}
     mainCyclist.y = World.mouseY;
     text("Distance: "+ distance, 500,50);
  
    mainCyclist.velocityY = mainCyclist.velocityY + 0.8
  
    if (path.x < 0){
      path.x = path.width/2;
    }
   if(distance%100===0 && distance>0) { 
     sound.play(); 
   }
  
       spawnObstacles();
  
    if(obstaclesGroup.isTouching(mainCyclist)){
       gameState = END;
      
   }
    
       if(PinkCG.isTouching(mainCyclist)){
       gameState = END;
             player1.changeAnimation("player1Collided",opp2);

         
   }
       if(YellowCG.isTouching(mainCyclist)){
       gameState = END;
  player2.changeAnimation("player2Collided",opp4);
  
         
   }
       if(RedCG.isTouching(mainCyclist)){
       gameState = END;
        player2.changeAnimation("player3Collided",opp6);
         
   }

  }
  else if (gameState === END) {
   // gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   PinkCG.setVelocityXEach(0);
    RedCG.setVelocityXEach(0);
    YellowCG.setVelocityXEach(0);

    

  mainCyclist.changeAnimation("SahilCollided",mainCyclistImg2);

    
  
    
    //change the trex animation
  //  t.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    PinkCG.setLifetimeEach(-1);
    YellowCG.setLifetimeEach(-1);
    RedCG.setLifetimeEach(-1);
    //if(mousePressedOver(restart)) {
      //reset();
    //}
        fill("skyblue");
    stroke("skyblue");
    text("restartmessage", gameOver.x-140, gameOver.y + 42);
    gameOver.visible = true;
  }
  
  
  

   //creating continous opponent players 
//var select_oppPlayer = Math.round(random(1,3));


//if (World.frameCount % 150 == 0) {
//if (select_oppPlayer == 1) { 

//pinkCyclists();

//}

  //else {

//yellowCyclists();
//}
//if(select_oppPlayer==2){
   // redCyclists();
  //}
 
}

  drawSprites();
  text("Distance: "+ distance, 500,50);
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(700,Math.round(random(50, 250)),10,40);
    obstacle.debug = true;
    mainCyclist.setCollider=(circle,20,20)
    obstacle.velocityX = -6 //-(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.09;
      obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset() {
  gameState = PLAY;
  mainCyclist.changeAnimation("SahilRunning", mainRacerImg1);
  PinkCG.destroyEach();
  YellowCG.destroyEach();
  RedCG.destroyEach();
  obstaclegroup.destroyEach();
  distance = 0;
}