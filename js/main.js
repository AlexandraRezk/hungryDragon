var game;
var score;
var soundOn=true;
var musicOn=true;
window.onload = function(){
    if(screen.width > 1500){
        //desktop or laptop
        game=new Phaser.Game(640,480,Phaser.AUTO, "ph_game");
    } else{
        //mobile device
        game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"ph_game");
    }
    game.state.add("StateMain", StateMain);
    game.state.add("StateOver", StateOver);
    game.state.add("StateTitle", StateTitle);
    game.state.add("StateInstruction", StateInstruction);
    game.state.start("StateTitle");
}