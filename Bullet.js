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
                this.currentFrame = 0;
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

    isOutSideScreen(pListe) {
        for (let i=pListe.length-1;i==0;i--) {
            let b=pListe[i];
            if(b.x<0 || b.x>(canvas.width/SCALE) || b.y<0 || b.y>(canvas.height/SCALE)) {
                pListe.splice(i,1);
                console.log("Destroy bullet!");
            }
        }   
    }
}