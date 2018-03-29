var StateOver={    
    
   preload:function()
    {
       game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
        game.load.spritesheet("flyingBex","images/main/BexFlying.png",112,80,10);
    },
    
    create:function()
    {
        this.top = 0;
        this.bottom=game.height - 120;
        
        this.buttonPlayAgain = game.add.button(game.world.centerX,game.world.centerY+100,"buttons",this.replay,this,0,1,0);
        this.buttonPlayAgain.anchor.set(0.5,0.5);
        
        //text Score
        this.scoreText = game.add.text(game.world.centerX,this.top+160,score);
        this.scoreText.fill="#000000";
        this.scoreText.fontSize = 64;
        this.scoreText.anchor.set(0.5,0.5);
        
        this.scoreLabel = game.add.text(game.world.centerX,this.top+120,"SCORE");
        this.scoreLabel.fill="#000000";
        this.scoreLabel.fontSize = 32;
        this.scoreLabel.anchor.set(0.5,0.5);
        
        //flyingBex
        this.flyingBex = game.add.sprite(game.world.centerX,game.world.centerY,"flyingBex");
        this.flyingBex.anchor.set(0.5,0.5);
        this.flyingBex.animations.add('fly', [0,1,2,3,4,5,6,7,8,9], 12, true);
        this.flyingBex.animations.play('fly');
        this.flyingBex.scale.x=-1;
        game.stage.backgroundColor="#1f8ecb";
    },
    
    replay:function(){
        game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}