let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};


let game = new Phaser.Game(config);
let backImage;
let frog, mumFrog;
let up, down, left, right;

function init() {
   
}

function preload() {

    this.load.image('backgroundImage', './assets/images/FroggerBackground.png');
    this.load.image('frog', './assets/images/Frog.png');
    this.load.image('mumFrog', './assets/images/MumFrog.png');
    this.load.image('heartImage', './assets/images/heart.png');


}

function create() {
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    backImage = this.add.image(0, -5, 'backgroundImage'); 
    backImage.setOrigin(0, 0); 
    backImage.setScale(1);

    frog = this.add.image(240, 300, 'frog'); 
    //frog.setOrigin(0, 0); 

    mumFrog = this.add.image((Phaser.Math.Between(20, 460)), (Phaser.Math.Between(2, 15)), 'mumFrog'); 
    mumFrog.setOrigin(0, 0); 


    heart = this.add.image(240,160,'heartImage');
    heart.setScale(0.0);
    //heart.setVisible(false);

}

function update() {
    if ((Phaser.Input.Keyboard.JustDown(down)) && (frog.y < 304))
    {
        frog.setAngle(180);
        frog.y += 16;
    }
    if ((Phaser.Input.Keyboard.JustDown(up))&& (frog.y > 16))
    {
        frog.setAngle(0);
        frog.y -= 16;  
    }
    if (Phaser.Input.Keyboard.JustDown(left)&& (frog.x > 16))
    { 
        frog.setAngle(-90);
        frog.x -= 16;
    }
    if (Phaser.Input.Keyboard.JustDown(right) &&(frog.x < 464))   
    { 
        frog.setAngle(90);
        frog.x += 16;
    }

    if(Phaser.Geom.Intersects.RectangleToRectangle (frog.getBounds(),mumFrog.getBounds())) {
        let tweenHeart = this.tweens.add({
            targets: heart,
            alpha: 0, 
            scale: 0,
            duration: 2000, 
            ease: 'Linear', 
            yoyo: true,
            //loop: -1
            });
        //heart.setVisible(true);
        //this.scene.restart(); 
    }


}