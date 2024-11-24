export class Bullet extends Phaser.GameObjects.Image
{
    constructor (scene)
    {
        super(scene, 0, 0, 'bullet');
        this.speed = 900;
        this.born = 0;
        this.direction = new Phaser.Math.Vector2(0, 0);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
        this.setScale(0.5);
    }

    fire (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); 
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        if (target.y >= this.y)
        {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = Math.atan((target.y - this.y) / (target.x - this.y));
        this.born = 0;
    }

    targetHit() {
        this.setActive(false);
        this.setVisible(false);
    }

    update(time, delta)
    {
        this.x += this.xSpeed * (delta / 1000);
        this.y += this.ySpeed * (delta / 1000);

        if (this.x > 800 || this.x < 0)
        {
            this.setActive(false);
            this.setVisible(false);
        } 
        else if (this.y > 600 || this.y < 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}