import {Bullet} from './bullet.js';
import {Enemy} from './enemy.js';

class Main extends Phaser.Scene
{
    moveKeys;
    player;
    playerBullets;
    enemies;
    gameOver = false;
    isShooting;
    shootTimer;

    preload ()
    {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bullet.png'); 
        this.load.image('default', 'assets/enemy_1.png');
        this.load.image('fast', 'assets/enemy_2.png');
        this.load.image('doubler', 'assets/enemy_3.png');
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        this.player = this.physics.add.sprite(400, 300, 'player').setScale(0.2);
        this.player.setCollideWorldBounds(true);

        this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.isShooting = false;
        this.shootTimer = null;

        this.input.on('pointerdown', (pointer) => {
            if (this.player.active === false || this.isShooting) { return; }
            this.isShooting = true;
    
            // Start firing bullets continuously
            this.shootTimer = this.time.addEvent({
                delay: 100, // Fire every 200ms (adjust for fire rate)
                callback: () => {
                    this.fireBullet(pointer);
                },
                callbackScope: this,
                loop: true
            });
        });
    
        // Pointer up: Stop firing bullets
        this.input.on('pointerup', () => {
            this.isShooting = false;
            if (this.shootTimer) {
                this.shootTimer.remove(); // Stop the shooting loop
            }
        });

        this.enemies = this.physics.add.group({
            classType: Enemy, 
            runChildUpdate: true
        });

        this.spawnEnemy(100, 50, 'default');
        this.spawnEnemy(0, 0, 'fast');
        this.spawnEnemy(700, 500, 'doubler');

        this.physics.add.collider(this.player, this.enemies, this.playerHitCallback, null, this);
        this.physics.add.overlap(this.playerBullets, this.enemies, this.enemyHitCallback, null, this);

    }

    spawnEnemy(x, y, type) {
        const enemy = new Enemy(this, x, y, type);
        this.enemies.add(enemy);
    }

    fireBullet(pointer) {
        const bullet = this.playerBullets.get().setActive(true).setVisible(true);
    
        if (bullet) {
            bullet.fire(this.player, pointer);
        }
    }

    playerHitCallback() {
        this.physics.pause();

        this.player.setTint(0xff0000);
        this.player.active = false
        
        this.gameOver = true;
    }

    enemyHitCallback(bullet, enemy) {
        if (bullet.active === true && enemy.active === true)
            {
                bullet.targetHit();
                enemy.takeDamage(50);
        }
            
    }

    update (time, delta)
    {
        if (this.gameOver)
        {
            return;
        }

        this.player.setVelocity(0);

        if (this.moveKeys.left.isDown)
        {
            this.player.setVelocityX(-200);
        } 
        else if (this.moveKeys.right.isDown)
        {
            this.player.setVelocityX(200);
        }
        
        if (this.moveKeys.up.isDown)
        {
            this.player.setVelocityY(-200);
        }
        else if (this.moveKeys.down.isDown)
        {
            this.player.setVelocityY(200);
        }

        this.enemies.children.entries.forEach((enemy) => {
            if (enemy.active) {
                enemy.update(time, delta, this.player);
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: Main
};

const game = new Phaser.Game(config);