class Letter {
    color: number;
    changed: boolean = false;

    constructor(sprite: Sprite, location: number, speed: number, color: number) {
        this.color = color;
        sprite.left = location;
        sprite.y = randint(10,110);
        sprite.vy = speed;        
    }

    impacted(sprite: Sprite, ball: Sprite) {
        if (!this.changed) {
            ball.startEffect(effects.ashes, 150);
            sprite.startEffect(effects.ashes, 100);
            sprite.image.replace(1, this.color);
            this.changed = true;
        }
    }

}