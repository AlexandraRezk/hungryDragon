var StateInstruction={    
    
   preload:function()
    {
       game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
        game.load.spritesheet("flyingBex","images/main/BexFlying.png",112,80,10);
        
        game.load.spritesheet("bexStuff","images/main/BexStuff.png",52,50,8);
        game.load.image("balloon", "images/main/thought.png")
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
        game.stage.backgroundColor="#1f8ecb";
        
        this.titleText=game.add.text(game.world.centerX,30,"Vacuum Flight Night",{ font: "50px Mina", fill: "#9afef7", stroke: "#222222", strokeThickness: 4, align:"center" });
        this.titleText.anchor.set(0.5,0.5);
        
        this.inText=game.add.text(game.world.centerX,100, "Gather only what Bex is thinking!!");
        this.inText.fill = "#000000";
        this.inText.anchor.set(0.5,0.5);
        
         //thought
        this.balloonGroup=game.add.group();
        this.balloon = game.add.sprite(0,0,"balloon");
        this.think = game.add.sprite(36,26,"bexStuff");
        this.balloonGroup.add(this.balloon);
        this.balloonGroup.add(this.think);
        this.balloonGroup.scale.x=.5;
        this.balloonGroup.scale.y=.5;
        this.balloonGroup.x=this.flyingBex.x-20;
        this.balloonGroup.y=this.flyingBex.y-100;
    },
    startGame:function(){
        game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}