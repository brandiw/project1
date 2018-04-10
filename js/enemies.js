
function createSlime(){
  let newSlime = slime2.create(360 + Math.random() * 400, 100 + Math.random() * 200,'slime1');
  newSlime.scale.setTo(2.5);
  game.physics.arcade.enable(newSlime);
  newSlime.body.collideWorldBounds = true;
  newSlime.health = 5;
  newSlime.anchor.set(0.5, 0.5);

  newSlime.animations.add("group-slime-move", [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 17, true);
  newSlime.animations.add('slime-die',[40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 17, false);
}


function slimeLogic(){
    if(slime1.health <= 0 ){
      slime1.body.velocity.x = 0;
      slime1.body.velocity.y = 0;
    }
    else if(this.game.physics.arcade.distanceBetween(this.slime1, this.player) < 95){
     slime1.body.velocity.x = 0;
     slime1.body.velocity.y = 0;
     slime1.play("slime-attack", false);
    }
    else if (this.game.physics.arcade.distanceBetween(this.slime1, this.player) > 95)
    {
      this.game.physics.arcade.moveToObject(slime1, this.player, 70);
      slime1.play("slime-move", true);

      if(game.time.now > nextHop){
        hop.play('', 0, .2, false);
        nextHop = game.time.now + 650;
      }
    } 

    
}

function slimeLogic2(){
  slime2.children.forEach(function(s){
    if(s.health <= 0 )
    {
      s.body.velocity.x = 0;
      s.body.velocity.y = 0;
    }
    else if(this.game.physics.arcade.distanceBetween(s, this.player) > 95)
      {
        game.physics.arcade.moveToObject(s, this.player, 70);
        s.play('group-slime-move', true);
      }
    if(game.time.now > nextHop)
      {
        hop.play('', 0, .3, false);
        nextHop = game.time.now + 650;
      }
  }); 
}


function slimeDeath(slime) {
  slime.health -= 1;

  if (slime.health <= 0)
  {
    console.log('slime is dying!');
    slime.play('slime-die');
    slimeDeathSound.play('', 0, 1, false);
    game.time.events.add(2000, slowSlimeDeath, this, slime);
  }
}

function slowSlimeDeath(slime){
  slime.kill();
  slime.alive = false;
  winCheck(slime);
}


function winCheck(slime){

  if(currentLevel === 1){
    if(!slime.alive){
      currentLevel += 1;
      mainbgm.stop();
      game.state.start('win');
    }
  }
  else if(currentLevel === 2){
    console.log('check all children');
    var allDead = true;
    slime2.children.forEach(function(s){
      if(s.alive){
        allDead = false;
      }
    });
    if(allDead){
      currentLevel += 1;
      mainbgm.stop();
    game.state.start('win');
    }
  }
  else {
    console.log('you won the game!');
  }
}

function createSlimeAnimations(){
    // slime1.animations.add('enemy-move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
    slime1.animations.add('slime-move', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 17, true);
    slime1.animations.add('slime-attack', [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 17, false);
    slime1.animations.add('slime-die', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 17, false);
    // slime2.callAll('animations.add', 'animations', 'slime-group-move', slimeFrameNames, 30, true, false);
}

    //  Here we create our group and populate it with 6 sprites
 
//  They are evenly spaced out on the X coordinate, with a random Y coordinate
// }
//  These are the frame names for the octopus animation. We use the generateFrames function to help create the array.

// var slimeFrameNames = Phaser.Animation.generateFrameNames('slimeGroupMove', 0, 24, '', 4);

//  Here is the important part. Group.callAll will call a method that exists on every child in the Group.
//  In this case we're saying: child.animations.add('swim', frameNames, 30, true, false)
//  The second parameter ('animations') is really important and is the context in which the method is called. 
//  For animations the context is the Phaser.AnimationManager, which is linked to the child.animations property.
//  Everything after the 2nd parameter is just the usual values you'd pass to the animations.add method.

// group.callAll('animations.add', 'animations', 'slime-group-move', slimeFrameNames, 30, true, false);

//  Here we just say 'play the swim animation', this time the 'play' method exists on the child itself, so we can set the context to null.
// group.callAll('play', null, 'slime-group-move');


