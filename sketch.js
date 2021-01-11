//WHAT TO FINISH//

//NICE SHOT last for a split second
//Buzzer noise as game ends
//put in Scenes 1 and Scene 3
//How to put score onto Scene 3

///////////////////////



var scene1= true;
var scene2=false;




//Scene 1 (Start screen)
var basketballPic
var start = "S T A R T"
var openingText = "  KING     of    the    Court"
var bballCourt
var kingCourt



//Scene 2
var sound
var endGame
var swoosh
var makeShot
var player;
var platform;
var gravity = 0.7;
var jump = 25;
var ball;
var backboard
var powerUp = 0;
var counter = 0;
var timeleft = 2;
var timer = 0;
var rim;
var score = 0;
var justShot = false;
var theScore = "POINTS"

var didScore = false;
var didScoreTimer = 60; // how long to show the niceshot animation 60 = 1 sec

var playBuzz = false;

function preload() {
  ballImg= loadImage("balll.png");
  hoop =loadImage ("BBALLcoding.png");
  sound = loadSound("JazzSong.mp3");
  swish = loadSound("Swishnoise.mp3");
  makeShot = loadSound("BBALLswish.mp3");
  endGame = loadSound("Buzzer.mp3");
  
    niceShot = loadImage("nice shot.png");

}
  
  
function setup() { 
  createCanvas(1200, 800);
  sound.loop();
  


  // setInterval (timeIt, 1000);
  player = createSprite(mouseX, mouseY, 60, 60);
  // player.setCollider("rectangle", 0,0, 100,100);
 ballImg.resize(100,100);
  player.addImage(ballImg);
  player.friction = 0.01;
  
  //how to make platform black
  //fill(0);
  platform = createSprite(20,790,100,20);
 
  
  backboard = createSprite(1108, 285, 3,400);
  // 
  hoopCircle = createSprite(1034, 400, 25, 25);
  rim = createSprite(943,380,1, 25);
  
   rim.visible = false;
  	hoopCircle.visible = false;
   
  // hoopCircle.setCollider("circle", 550, 600, 50);
  
  player.restitution = 0.8;
  platform.immovable = true;
  backboard.immovable= true;
  rim.immovable = true;
  
  backboard.visible = false
  platform.shapeColor = color(179,210,52);
  
  
} 

 

  

function draw() { 
  background(220);
  image (hoop, -25, -25, width +100,height+50);
  
   // player.bounce(platform);
  
  
  
  
  player.velocity.y += gravity;
  player.velocity.x += 0;
  
  if(player.bounce(platform)){
    //player.velocity.y=0;
  }
  
  if(player.bounce(backboard) ){
    // player.velocity.x *=-0.7;

  }
  
  if(player.bounce(rim)){
    
  }
  
  /////////NICE SHOT ANIMATION/////////
  
  
  
  if(player.overlap(hoopCircle)){
    if(justShot){
    	score++;
      	justShot = false;
      
      	// turn this on if you scored
      	didScore = true;
      // image(niceShot, 800, 300, 130,100);
      makeShot.play();
    }
  }
  
  // if you scored, draw the nice shot image and subtract from the timer
  // until it's zero, at which point everything gets reset
  if(didScore){
    image(niceShot, 800, 300, 130,100);
    didScoreTimer--;
    if(didScoreTimer <= 0){
     didScore = false; 
      didScoreTimer = 60;
    }
  }
  
  ////////////////////////////////////
  
  
  
  if(keyDown(UP_ARROW)){
  	powerUp += 0.1;
    powerUp = constrain(powerUp, 0, 20);
    
  }
  
  if ( keyWentUp(UP_ARROW) ){
    player.velocity.y = -jump - powerUp;
    player.velocity.x = jump/2 + powerUp/2;
     // player.setSpeed(30, 280);
    swish.play();
  }
  
  

  
  push();
  	fill(179,210,52);
	stroke(0);
  	strokeWeight(5);
  rect(800,790, 50, 1 - powerUp*15);
  pop();
 
  
  
  drawSprites();
  
  
  
  fill (0);
  stroke (188,80,158);
  strokeWeight (5);
  rect (1115, 270,80, 70);   
  textSize(35);
  text(timeleft, 1137, 313);
  
  textSize(60);
  text(score, 1137,190);
  
  textSize(15);
  textStyle (BOLD);
  text(theScore, 1128, 130);
  
  
  if( frameCount % 60 == 0){
   timeleft --; 
  }
  
  if(timeleft < 0){
   timeleft=0; 
  }
  
  
  /////////NICE SHOT ANIMATION/////////
  
  //BUZZER PLAYS THROUGHOUT for some reason
  
  // you had an extra semicolon in here
if(timeleft == 0){
playBuzz = true;
    // just play the sound once

if(playBuzz){
endGame.play();
timeleft = 60;
playBuzz = false;
    }
  }
  /////////////////////////////////////
  
  
  if(player.position.x > width + 20){
   resetLevel(); 
  }
  
  if(player.position.y > height + 20){
    resetLevel();
  }
  
 
  
} 



function mousePressed(){
  
  resetLevel();
}


function resetLevel(){
 var randX = random(0, 470);
  var randY = random(255, height);
  
  platform.position.x = randX;
  platform.position.y = randY;
  
  player.position.x = randX;
  player.position.y = randY - 65;
  
  player.velocity.x = 0;
  player.velocity.y = 0;
  
  powerUp = 0;
  
  justShot = true;
}


