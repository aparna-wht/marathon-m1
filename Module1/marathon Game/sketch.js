var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var finishedPlayers=0
var passedFinish=false;

var form, player, game;

var players, plr1, plr2, plr3, plr4;

var track, plr1_img, plr2_img, plr3_img, plr4_img;

function preload(){
  track = loadImage("images/tracktemp.png");
  plr1_img = loadGif("images/player1.gif");
  plr2_img = loadGif("images/player2.gif");
  plr3_img = loadGif("images/player3.gif");
  plr4_img = loadGif("images/player4.gif");
  ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //start the game
  if (playerCount === 4 && finishedPlayers === 0) {
    game.update(1);
  }

  //start the game for real
  if (gameState === 1) {
    game.play();
  }

  //end the game
  if (finishedPlayers === 4) {
    game.update(2);
    //gameState = 2;
  }

  //display ranking
  if (gameState === 2 && finishedPlayers === 4) {
    game.displayRanks();
  }
}
