var StateTitle={    
    
   preload:function()
    {
       game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
        game.load.spritesheet("flyingBex","images/main/BexFlying.png",112,80,10);
    },
    
    create:function()
    {
        this.buttonStart = game.add.button(game.world.centerX,game.world.centerY+100,"buttons",this.startGame,this,6,7,6);
        this.buttonStart.anchor.set(0.5,0.5);
        
        //flyingBex
        this.flyingBex = game.add.sprite(game.world.centerX,game.world.centerY,"flyingBex");
        this.flyingBex.anchor.set(0.5,0.5);
        this.flyingBex.animations.add('fly', [0,1,2,3,4,5,6,7,8,9], 12, true);
        this.flyingBex.animations.play('fly');
        game.stage.backgroundColor="#26C9FF";
        
        this.titleText=game.add.text(game.world.centerX,60,"Flying Bex",{ font: "50px Lobster", fill: "#00D900", stroke: "#222222", strokeThickness: 4, align:"center" });
        this.titleText.anchor.set(0.5,0.5);
    },
    startGame:function(){
        game.state.start("StateInstruction");
    },
    
    update:function()
    {       
        
    }    
    
}