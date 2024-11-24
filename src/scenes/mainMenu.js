export class MainMenu extends Phaser.Scene
{
    constructor() {
        super("mainMenu")
    }
    
    preload () {}

    create() {
        this.add.text(400, 300, "HERE GOES THE MAIN MENU").setOrigin(0.5, 0.5);
    }

    update() {
        this.time.delayedCall(4000, () => {
            this.scene.start('game');
        });
    }
}