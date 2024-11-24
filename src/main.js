import {MainMenu} from "./scenes/mainMenu.js";
import {Game} from "./scenes/game.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xab6100,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, Game]
};

const game = new Phaser.Game(config);