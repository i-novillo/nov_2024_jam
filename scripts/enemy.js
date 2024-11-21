export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y, type).setScale(0.1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.type = type;       
        this.alive = true;

        this.setCharacteristics(type);
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
                this.speed = 100;
                this.health = 100;
                break;
        }
    }

/* 
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.alive = false;
        this.setActive(false);
        this.setVisible(false);
        this.body.setVelocity(0, 0);
    }
 */
    update(time, delta) {
        const player = this.scene.player;

        if (this.alive) {
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