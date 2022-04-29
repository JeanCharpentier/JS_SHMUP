class Powerup {
    constructor(pX,pY) {
        let imgPU = imageLoader.getImage("images/powerups.png");
        this.sprPU = new Sprite(imgPU,pX,pY);
        this.sprPU.setTileSheet(16,16);
        this.sprPU.currentFrame = 0;

        this.type = "QUAD";
        this.timer = 0;

        this.x = this.sprPU.x;
        this.y = this.sprPU.y;
    }

    setType(pType) {
        this.type = pType;
        switch(this.type) {
            case "QUAD":
                this.sprPU.currentFrame = 0;
                this.timer = 20;
                break;
            case "WING":
                this.sprPU.currentFrame = 1;
                this.timer = 10;
                break;
            case "SHIELD":
                this.sprPU.currentFrame = 2;
                this.timer = 5;
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
        this.puType = ["QUAD","SHIELD"];
    }

    addPowerup(pX,pY,pType) {
        let pu = new Powerup(pX,pY);
        pu.setType(pType);
        this.puList.push(pu);
    }

    update(dt) {
        for(let n=this.puList.length-1;n>=0;n--) {
            this.puList[n].update(dt);

            // Collision avec le joueur
            if(isColliding(this.puList[n].x,this.puList[n].y,this.puList[n].sprPU.tileSize.x,this.puList[n].sprPU.tileSize.y,this.gs.player.sprShip.x,this.gs.player.sprShip.y,this.gs.player.sprShip.tileSize.x,this.gs.player.sprShip.tileSize.y)) {

                this.gs.player.powerup = this.puList[n].type;
                this.gs.player.puTimer = this.puList[n].timer;
                this.gs.player.puChrono = this.puList[n].timer;

                this.puList.splice(n,1);
            }
        }
    }

    draw(pCtx){
        this.puList.forEach(p => {
            p.draw(pCtx);
        });
    }
}