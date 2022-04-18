class Powerup {
    constructor(pX,pY) {
        let imgPU = imageLoader.getImage("images/powerups.png");
        this.sprPU = new Sprite(imgPU,pX,pY);
        this.sprPU.setTileSheet(16,16);
        this.sprPU.currentFrame = 0;

        this.type = "QUAD";

        this.x = this.sprPU.x;
        this.y = this.sprPU.y;
    }

    setType(pType) {
        this.type = pType;
        switch(this.type) {
            case "QUAD":
                this.sprPU.currentFrame = 0;
                break;
            case "WING":
                this.sprPU.currentFrame = 1;
                break;
            default:
                break;
        }
    }

    update(dt) {
        this.sprPU.update(dt);
        this.sprPU.y = this.y + (20*dt);
        this.y = this.sprPU.y; 
    }

    draw(pCtx) {
        this.sprPU.draw(pCtx);  
    }
}

class PowerupManager {
    constructor(pGS) {
        this.gs = pGS;
        this.puList = [];
    }

    addPowerup(pX,pY,pType) {
        let pu = new Powerup(pX,pY);
        pu.setType(pType);
        this.puList.push(pu);
    }

    update(dt) {
        this.puList.forEach(p => {
            p.update(dt);
        });
    }

    draw(pCtx){
        this.puList.forEach(p => {
            p.draw(pCtx);
        });
    }
}