music = "";
rightWristX = 0;
rightWristY = 0;
/*created by prashant shukla */

var paddle2 =10,paddle1=10;

var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 =0;
var paddle1Y;

var  playerscore =0;
var audio1;
var pcscore =0;
var gameStatus = "";
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}
function preload(){
  music = loadSound("Legends Never Die.mp3");
}
function pause() {
  noLoop();  
}
function resume() {
  loop();
}
function restart() {
  gameStatus = "";
  pcscore = 0;
}
function setup(){
  var canvas =  createCanvas(700,600);
  canvas.parent("canvas");
  video = createCapture(VIDEO);
  video.parent("canvas");
  video.hide();
  video.size(700,600);
  music.play();
  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose', gotPoses);
  music.loop();
}
function modelLoaded(){
  console.log("Posenet Model Added");
}
function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    
  }
}
//Code for music controls
function mute(){
  music.setVolume(0);
 document.getElementById("vol").className = "glyphicon glyphicon-volume-off";
 
}
function unmute(){
  music.setVolume(100);
  document.getElementById("vol").className = "glyphicon glyphicon-volume-up";
}
function change_vol(){
  
  value_of_volume = document.getElementById("volume");
  console.log(value_of_volume);
  real_res = value_of_volume / 100;
  music.setVolume(real_res);
}
//End*
function startGame(){
  gameStatus = "start";
  document.getElementById("status").innerHTML = "Game is Loaded !";
}
function draw(){
  if (gameStatus != ""){
    image(video,0,0,700,600);
  
  circle(rightWristX,rightWristY,40);
  fill("black");
  stroke("black");
  rect(680,0,20,700);

  fill("black");
  stroke("black");
  rect(0,0,20,700);
 
   //funtion paddleInCanvas call 
   paddleInCanvas();
 
   //left paddle
   fill(250,0,0);
    stroke(0,0,250);
    strokeWeight(0.5);
   paddle1Y = mouseY; 
   rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
   
   
    //pc computer paddle
    fill("#FFA500");
        stroke("#FFA500");
   var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
    
    //function midline call
    midline();
    
    //funtion drawScore call 
   drawScore();
   
   //function models call  
   models();
   
   //function move call which in very important
    move();
  }
  else{
    background("green");
    noStroke();
    fill("purple");
    textSize(30);
    textStyle(BOLDITALIC);
    text("AI Ping Pong",270,200);
    text("___________",270,200);
    fill("grey");
    textStyle(ITALIC);
    text("Click on the start button to play the game ! ", 80, 300);
    fill("white");
    textStyle(NORMAL);
    textSize(15);
    text("Created By :- Shaan Lashkari",10,590);
    text("________________________",10,590);
  }
  
}



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscore,555,50)
}


//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5; 
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
  }
}
if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over!☹☹",width/2,height/2);
    text("Try Pressing the Restart button to play again!",width/2,height/2+30)
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:"+abs(ball.dx),50,15);
    text("Height:"+height,235,15)
}


//this function help to not go te paddle out of canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY =0;
  }  
}
