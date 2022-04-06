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
            case "SMALLW":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 0;
                this.friendly = false;
                break;
            case "SMALLB":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 1;
                this.friendly = false;
                break;
            case "SRINGW":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 7;
                this.friendly = false;
                break;
            case "SRINGB":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 6;
                this.friendly = false;
                break;
            case "BRINGW":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 5;
                this.friendly = false;
                break;
            case "BRINGB":
                img = imageLoader.getImage("images/bullets.png");
                super(img,px,py);
                this.setTileSheet(16,16);
                this.currentFrame = 4;
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
            }
        }   
    }
}