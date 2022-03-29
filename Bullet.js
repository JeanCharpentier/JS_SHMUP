class Bullet extends Sprite {
    constructor(px,py,pVX,pVY,pType) {
        let img;
        switch (pType) {
            case "PLAYER":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 0;
                this.friendly = true;
                break;
            case "ALIEN":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 5;
                this.friendly = false;
                break;
            case "BOSS":
                this.friendly = false;
                break;
            default:
                console.log("Erreur : Pas de type de bullet");
                break;
        }
        this.type = pType;
        this.vx = pVX;
        this.vy = pVY;
    }

    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
    }
}