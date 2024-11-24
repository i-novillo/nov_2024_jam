export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y, type)

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.type = type;       
        this.alive = true;

        this.setCharacteristics(type);
        this.setSize(this.displayWidth, this.displayHeight);
        this.setScale(0.1);
    }

    setCharacteristics(type) {
        switch (type) {
            case 'default':
                this.speed = 100;
                this.health = 100;
                break;
            case 'fast':
                this.speed = 200;
                this.health = 50;
                break;
            case 'doubler':
                this.speed = 50;
                this.health = 200;
                break;
            default:
                break;
        }
    }

 
    takeDamage(amount) {
        this.health -= amount;
        this.setTint(0xff0000);

    // Reset the tint after 100ms
    this.scene.time.delayedCall(100, () => {
        this.clearTint();
    });
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.alive = false;
        this.disableBody(true, true);
    }
 
    update(time, delta) {
        const player = this.scene.player;

        if (this.alive && this.scene.gameStarted) {
            const direction = Math.atan((player.x - this.x) / (player.y - this.y));
    
            let xSpeed, ySpeed;
    
            if (player.y >= this.y) {
                xSpeed = this.speed * Math.sin(direction);
                ySpeed = this.speed * Math.cos(direction);
            } else {
                xSpeed = -this.speed * Math.sin(direction);
                ySpeed = -this.speed * Math.cos(direction);
            }
    
            this.setVelocity(xSpeed, ySpeed);
        }
    }
}