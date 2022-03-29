class Bullet extends Sprite {
    constructor(px,py,pVX,pVY,pType) {
        let img;
        switch (pType) {
            case "PLAYER":
                img = imageLoader.getImage("images/ShotTiny.png");
                super(img,px,py);
                this.setTileSheet(18,14);
                this.currentFrame = 2;
                this.friendly = true;
                break;
            case "ALIEN":
                img = imageLoader.getImage("images/ShotBasic.png");
                super(img,px,py);
                this.setTileSheet(9,8);
                this.addAnimation("idle", [0,1,2,3], 0.1, true);
                this.startAnimation("idle");
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