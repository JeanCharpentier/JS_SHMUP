class Bullet extends Sprite {
    constructor(px,py,pVX,pVY,pType) {
        let img;
        switch (pType) {
            case "PLAYERW":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 0;
                this.friendly = true;
                break;
            case "PLAYERB":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 1;
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

class bulletsManager {
    constructor() {
        this.lstBullets = [];
    }

    clear() {
        this.lstBullets = [];
    }

    shoot(pX,pY,pAngle,pSpeed,pType) {
        /*let type = "PLAYERW";
        if (this.player.state == 0) {
            type = "PLAYERW";
        }else if (this.player.state == 1) {
            type = "PLAYERB";
        }*/
        //let position = this.player.getShotPosition(16);
        let vx,vy;
        vx = pSpeed * Math.cos(pAngle);
        vy = pSpeed * Math.sin(pAngle);

        let bL = new Bullet(pX-3,pY+10, 0,-5,pType);
        let bR = new Bullet(pX+5,pY+10, 0,-5,pType);
        this.lstBullets.push(bL);
        this.lstBullets.push(bR);
    }

    update() {

    }

    draw() {

    }
}