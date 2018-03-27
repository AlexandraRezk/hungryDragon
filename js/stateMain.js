var StateMain={    
    
   preload:function()
    {
       if (screen.width < 1500){
           game.scale.forceOrientation(true, false);
       }
        
        game.load.spritesheet("flyingBex","images/main/BexFlying.png",112,80,10);
        game.load.image("background", "images/main/background.png");
        game.load.spritesheet("candy","images/main/candy.png",52,50,8);
        game.load.image("balloon", "images/main/thought.png")
        game.load.spritesheet("soundButtons","images/ui/soundButtons.png",44,44,4);
        game.load.audio("burp", "sounds/burp.mp3");
        game.load.audio("gulp", "sounds/gulp.mp3");
        game.load.audio("backgroundMusic", "sounds/background.mp3");
    },
    
    create:function()
    {
        //init vars
        score = 0;
        this.musicPlaying=false;
        this.lift=350;
        this.fall=500;
        this.delay=2;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.stage.backgroundColor="#000000";

        
        this.top = 0;
        this.bottom=game.height - 120;
        
        //sounds
        this.burp=game.add.audio("burp");
        this.glup=game.add.audio("gulp");
        this.backgroundMusic=game.add.audio("backgroundMusic");
        this.backgroundMusic.volume=.5;
        this.backgroundMusic.loop=true;
        
        //flyingBex
        this.flyingBex = game.add.sprite(0,0,"flyingBex");
        this.flyingBex.animations.add('fly', [0,1,2,3,4,5,6,7,8,9], 12, true);
        this.flyingBex.animations.play('fly');
        
        //background
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');
        
        //IPAD Fix
        if (screen.height > 764){
          this.background.y=game.world.centerY-this.background.height/2;
            this.top=this.background.y;
            this.bottom=this.background.y+360;
       }
        
        this.flyingBex.bringToTop();
        this.flyingBex.y = this.top;
      
        this.background.autoScroll(-100,0);
        
        //candies
        this.candies = game.add.group();
        this.candies.createMultiple(40,'candy');
        this.candies.setAll('checkWorldBounds',true);
        this.candies.setAll('outOfBoundsKill',true);
        
        //thought
        this.balloonGroup=game.add.group();
        this.balloon = game.add.sprite(0,0,"balloon");
        this.think = game.add.sprite(36,26,"candy");
        this.balloonGroup.add(this.balloon);
        this.balloonGroup.add(this.think);
        this.balloonGroup.scale.x=.5;
        this.balloonGroup.scale.y=.5;
        this.balloonGroup.x=50;
        
        //text Score
        this.scoreText = game.add.text(game.world.centerX,this.top+60,"0");
        this.scoreText.fill="#000000";
        this.scoreText.fontSize = 64;
        this.scoreText.anchor.set(0.5,0.5);
        
        this.scoreLabel = game.add.text(game.world.centerX,this.top+20,"SCORE");
        this.scoreLabel.fill="#000000";
        this.scoreLabel.fontSize = 32;
        this.scoreLabel.anchor.set(0.5,0.5);
        
        //sound buttons
        this.btnMusic=game.add.sprite(20,20, "soundButtons");
        this.btnSound=game.add.sprite(70,20, "soundButtons");
        this.btnMusic.frame=2;
        
          game.physics.enable([this.flyingBex,this.candies], Phaser.Physics.ARCADE);
        this.flyingBex.body.gravity.y=this.fall;
        this.flyingBex.body.immovable = true;
        
       this.setListeners(); 
        this.resetThink();
         this.updateButtons();
        this.updateMusic();
    },
    
    setListeners:function(){
         if (screen.width < 1500){ game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
        game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
        
        game.time.events.loop(Phaser.Timer.SECOND*this.delay, this.fireCandy, this);
        
        this.btnSound.inputEnabled=true;
        this.btnSound.events.onInputDown.add(this.toggleSound,this);
        this.btnMusic.inputEnabled=true;
        this.btnMusic.events.onInputDown.add(this.toggleMusic,this);
    },
    
    toggleSound:function(){
        soundOn=!soundOn;
        this.updateButtons();
    },
    
    toggleMusic:function(){
        musicOn=!musicOn;
        this.updateButtons();
        this.updateMusic();
    },
    
    updateMusic:function(){
      if (musicOn==true){
          if(this.musicPlaying==false){
              this.musicPlaying=true;
         this.backgroundMusic.play(); 
          }
      }  else {
          this.musicPlaying=false;
          this.backgroundMusic.stop();
      }
    },
    
    updateButtons:function(){
      if(soundOn == true){
          this.btnSound.frame=0;
      }  else{
          this.btnSound.frame=1;
      }
        if(musicOn == true){
          this.btnMusic.frame=2;
      }  else{
          this.btnMusic.frame=3;
      }
        
    },
    
    fireCandy:function(){
      var candy = this.candies.getFirstDead();
        var yy = game.rnd.integerInRange(this.top,this.bottom);
        var xx = game.width-100;
        var type = game.rnd.integerInRange(0,7);
        
        candy.frame = type;
        candy.reset(xx,yy);
        candy.enabled = true;
        candy.body.velocity.x = -200;
    },
    
    wrongWay:function(){
        document.getElementById("wrongWay").style.display="block";
    },
    
    rightWay:function(){
        document.getElementById("wrongWay").style.display="none";
    },
    
    flap:function(){
        this.flyingBex.body.velocity.y = -this.lift;
    },
    onEat:function(flyingBex,candy){
        if(this.think.frame == candy.frame){
            candy.kill();
            this.resetThink();
            score++;
            this.scoreText.text = score;
            if(soundOn==true){
                this.glup.play();
            }
        } else{
            this.backgroundMusic.stop();
            if(soundOn==true){
                this.burp.play();
             }
            candy.kill();
            game.state.start("StateOver");
             
        }
        
    },
    
    resetThink:function(){
        var thinking = game.rnd.integerInRange(0,7);
        this.think.frame = thinking;
    },
    
    update:function(){  
        game.physics.arcade.collide(this.flyingBex,this.candies,null,this.onEat, this);
        
        this.balloonGroup.y = this.flyingBex.y - 60;
    
        if(game.input.activePointer.isDown){
            this.flap();
        }
        
        if(this.flyingBex.y < this.top){
            this.flyingBex.y = this.top;
            this.flyingBex.body.velocity.y = 0;
        }
        
        if(this.flyingBex.y > this.bottom){
            this.flyingBex.y = this.bottom;
            this.flyingBex.body.gravity.y = 0;
        } else{
            this.flyingBex.body.gravity.y = 500;
        }
    }    
    
}