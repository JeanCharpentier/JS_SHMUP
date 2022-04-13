class Bullet extends Sprite {
    constructor(px,py,pVX,pVY,pType) {
        let img;
        img = imageLoader.getImage("images/bullets.png");
        super(img,px,py);
        this.setTileSheet(16,16);

        switch (pType) {
            case "PLAYERW":
                this.currentFrame = 0;
                this.friendly = true;
                this.state = 0;
                break;
            case "PLAYERB":
                this.currentFrame = 1;
                this.friendly = true;
                this.state = 1;
                break;
            case "SMALLW":
                this.currentFrame = 0;
                this.friendly = false;
                this.state = 0;
                break;
            case "SMALLB":
                this.currentFrame = 1;
                this.friendly = false;
                this.state = 1;
                break;
            case "SRINGW":
                this.currentFrame = 7;
                this.friendly = false;
                this.state = 0;
                break;
            case "SRINGB":
                this.currentFrame = 6;
                this.friendly = false;
                this.state = 1;
                break;
            case "BRINGW":
                this.currentFrame = 5;
                this.friendly = false;
                this.state = 0;
                break;
            case "BRINGB":
                this.currentFrame = 4;
                this.friendly = false;
                this.state = 1;
                break;
            case "BOSS":
                this.currentFrame = 5;
                this.friendly = false;
                this.state = 0;
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

    outOfScreen(pWidth, pHeight) {
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight) {
            return true;
        } else { return false; }
    }
}

class BulletsManager{
    constructor(pGS) {
        this.lstBullets = [];
        this.pEmitter = null;
        this.gs = pGS;
    }

    clear() {
        this.lstBullets = [];
    }

    shoot(px, py, pAngle, pSpeed, pType) {
        //console.log("angle " + pAngle.toString());
        let vx, vy;
        vx = pSpeed * Math.cos(pAngle);
        vy = pSpeed * Math.sin(pAngle);
        let b = new Bullet(px, py, vx, vy, pType);
        this.lstBullets.push(b);
    }

    update(dt) {
        for (let index = this.lstBullets.length - 1; index >= 0; index--) {
            let b = this.lstBullets[index];
            b.update(dt);

            // Collisions
            if(!b.friendly) { // Bullets touchent Joueur
                if(isColliding(b.x,b.y,b.tileSize.x,b.tileSize.y,this.gs.player.x,this.gs.player.y,this.gs.player.sprShip.tileSize.x,this.gs.player.sprShip.tileSize.y)) {
                    if(b.state == this.gs.player.state) {
                        this.lstBullets.splice(index, 1);
                        if(this.gs.player.sprLifes.currentFrame < 5){
                            this.gs.player.sprLifes.currentFrame += 1;
                        }
                    }else {
                        this.lstBullets.splice(index, 1);
                        if(this.gs.player.sprLifes.currentFrame > 0){
                            this.gs.player.sprLifes.currentFrame -= 1;
                        }
                        if(this.gs.player.sprLifes.currentFrame == 0){
                            console.log("GAME OVER");
                        }
                            
                    }
                }
            }
            
            if(b.friendly) { // Bullets touchent ennemis
                this.gs.wavesManager.wavesList.forEach(w => {
                    for (let n=w.alienList.length-1;n>=0;n--) {
                        if(isColliding(b.x,b.y,b.tileSize.x,b.tileSize.y,w.alienList[n].sprite.x,w.alienList[n].sprite.y,w.alienList[n].sprite.tileSize.x,w.alienList[n].sprite.tileSize.y)) {
                            // Particules
                            this.pEmitter = new ParticleEmitter(b.x,b.y);
                            for (let n=0;n<=50;n++) {
                                this.pEmitter.add();
                                console.log("particles!");
                            }
                            this.lstBullets.splice(index, 1);
                            w.alienList.splice(n,1);
                        }
                    }
                });
            }
            if (b.outOfScreen(canvas.width, canvas.height)) { // Destruction des bullets hors écran
                this.lstBullets.splice(index, 1);
            }
        }
        if(this.pEmitter != null) {
            this.pEmitter.update(dt);
        }
    }

    draw(pCtx) {
        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });
        if(this.pEmitter != null) {
            this.pEmitter.draw(pCtx);
        }
    }
}