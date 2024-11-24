import {Bullet} from '../entities/bullet.js';
import {Enemy} from '../entities/enemy.js';

export class Game extends Phaser.Scene
{
    moveKeys;
    player;
    playerBullets;
    enemies;
    gameOver = false;
    gameStarted = false;
    isShooting;
    shootTimer;

    constructor() {
        super("game")
    }

    preload ()
    {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bullet.png'); 
        this.load.image('default', 'assets/enemy_1.png');
        this.load.image('fast', 'assets/enemy_2.png');
        this.load.image('doubler', 'assets/enemy_3.png');
    }

    create (data)
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

        this.countdownValue = 3; // Start from 3 seconds
        this.countdownText = this.add.text(400, 300, this.countdownValue, {
            fontFamily: '"Press Start 2P", Arial',
            fontSize: '100px',
            fill: '#ffcc00',
            stroke: '#000',
            strokeThickness: 6,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#333',
                blur: 4,
                stroke: true,
                fill: true,
            },
        }).setOrigin(0.5, 0.5); 

        this.startCountdown();

        this.input.on('pointerdown', (pointer) => {
            if (!this.player.active || this.isShooting || !this.gameStarted) { return; }
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
        if (data.difficulty === 'medium' || data.difficulty === 'hard') {
            this.spawnEnemy(0, 0, 'fast');
        }

        if (data.difficulty === 'hard') {
            this.spawnEnemy(700, 500, 'doubler');
        }

        this.physics.add.collider(this.player, this.enemies, this.playerHitCallback, null, this);
        this.physics.add.overlap(this.playerBullets, this.enemies, this.enemyHitCallback, null, this);
    }

    startCountdown() {
        this.time.addEvent({
            delay: 1000,
            callback: this.updateCountdown,
            callbackScope: this,
            loop: true,
        });
    }

    updateCountdown() {
        this.countdownValue -= 1;
        this.countdownText.setText(this.countdownValue); 

        if (this.countdownValue === 0) {
            this.countdownText.setText('Go!');
            this.time.addEvent({
                delay: 500, 
                callback: this.startGame,
                callbackScope: this,
            });
        }
    }

    startGame() {
        this.countdownText.setVisible(false); 
        this.gameStarted = true; 
        this.player.setActive(true).setVisible(true);
    }

    update (time, delta)
    {
        if (this.gameOver || !this.gameStarted)
        {
            return;
        }

        this.player.setVelocity(0);
        if (this.moveKeys.left.isDown){
            this.player.setVelocityX(-200);
        } else if (this.moveKeys.right.isDown) {
            this.player.setVelocityX(200);
        }
        
        if (this.moveKeys.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.moveKeys.down.isDown) {
            this.player.setVelocityY(200);
        }

        this.enemies.children.entries.forEach((enemy) => {
            if (enemy.active) {
                //enemy.update(time, delta, this.player);
            }
        });
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
}