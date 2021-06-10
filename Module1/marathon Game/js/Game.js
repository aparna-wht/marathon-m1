class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    plr1 = createSprite(100,200);
    plr1.addImage("plr1",plr1_img);
    plr1.scale=0.25;
    plr1.debug=true;

    plr2 = createSprite(300,200);
    plr2.addImage("plr2",plr2_img);
    plr2.scale=0.25;

    plr3 = createSprite(500,200);
    plr3.addImage("plr3",plr3_img);
    plr3.scale=0.25;

    plr4 = createSprite(700,200);
    plr4.addImage("plr4",plr4_img);
    plr4.scale=0.25;

    players = [plr1, plr2, plr3, plr4];
   passedFinish = false;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getFinishedPlayers(); 
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
     // rectMode(CENTER);
      imageMode(CORNER);
      image(track,0,0,displayWidth*5,displayHeight)
      //var display_position = 100;
      
      //index of the array
      var index = 0

      //x and y position of the players
      var y = 0 ;
      var x ;
  
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in y direction
        x = allPlayers[plr].distance+100;
        y= y + 150;
       
        players[index-1].x = x;
        players[index-1].y = y;
    
        
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
           camera.position.x = players[index-1].x+(displayWidth/4);
           
           camera.position.y = displayHeight/2;

        }
       
          textAlign(CENTER);
          textSize(20);
          text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      if(player.distance<7000 && passedFinish === false)
      {
        player.distance +=30
        console.log(player.distance);
      }
      else if(player.distance > 7000 && passedFinish === false ){
       
      console.log("before"+finishedPlayers)
           
       finishedPlayers+=1;
       console.log("after add"+finishedPlayers)
       Player.updateFinishedPlayers(finishedPlayers);
       
        player.rank = finishedPlayers;
        passedFinish = true;
        
      }   
      player.update();
    }

   
    drawSprites();
  }

  displayRanks(){
    //display the medals
    camera.position.y = 0;
    camera.position.x = 0;

    clear ();
    Player.getPlayerInfo();

    textAlign(CENTER);
    textSize(50);
    
    for(var plr in allPlayers){
      text("🏆🏆🏆Leader Board🏆🏆🏆", 0,-100)
        if(allPlayers[plr].rank === 1){
            text("🎉🎉🎉1st: 🥇" + allPlayers[plr].name, 0, 50);
        }else if(allPlayers[plr].rank === 2){
            text("🎉🎉2nd: 🥈" + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
        }else if(allPlayers[plr].rank === 3){
            text("🎉3rd: 🥉" + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
        }
        else{
            
            text("✨4th: 🎉" + allPlayers[plr].name, 0, 225);
        }
    }
}

 
}
