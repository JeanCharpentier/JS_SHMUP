class Alien {
    constructor(pSprite,pGS) {
        this.sprite = pSprite;
        this.pendingDelay = 0;
        this.timer = 0;
        this.speed = 1;
        this.started = false;
        this.life = 1;
        this.points = 0;

        this.gs = pGS;

        this.angle = 1;
        this.angleOffset = 0;
        this.nbArms = 1;

        this.amplitude = 0;

        this.shootType = null;
        this.shootSpeed = 2;
        this.shootTimer = 0;       
    }

    update(dt) {
        this.sprite.update(dt);        
        this.shootTimer -= dt;
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }

    fire() {
        switch(this.shootType) {
            case "BOSSW":
                this.shootSpeed = 0.2;
                this.nbArms = 10;
                this.angleOffset = ((2*Math.PI)/this.nbArms)/10;
                break;
            case "BOSSB":
                this.shootSpeed = 0.05;
                this.nbArms = 10;
                this.angleOffset = ((2*Math.PI)/this.nbArms)/10;    
                break;
            case "SRINGW":
                this.shootSpeed = 0.4;
                break;
            case "SRINGB":
                this.shootSpeed = 0.4;
                break;
            case "BRINGW":
                this.shootSpeed = 0.5;
                break;
            case "BRINGB":
                this.shootSpeed = 0.5;
                break;
            default:
                break;
        }

        if(this.shootType != "NONE") {
            if(this.shootTimer <= 0) {
                if(this.nbArms != 1) {
                    for(let i=1;i<=this.nbArms;i++){
                        this.angle += this.angleOffset;
                        this.gs.bulletsManager.shoot(this.sprite.x, this.sprite.y, this.angle * (2*Math.PI), 2, this.shootType);
                    }
                }else {
                    this.gs.bulletsManager.shoot(this.sprite.x, this.sprite.y, this.angle * (-1*(3*Math.PI)/2), 5, this.shootType);
                }
                
                this.shootTimer = this.shootSpeed;
            }
        }
    }
}

class AlienWave {
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY,pShape="line",pShapePower=10,pShoot=null,pSpeed=1) {
        this.alienList = [];
        this.startDistance = pStartDistance;
        this.started = false;
        this.sprite = pSprite;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;
        this.shape = pShape;
        this.shapePower = pShapePower;
        this.shootType = pShoot;
        this.speed = pSpeed;
    }

    addAlien(pAlien){
        this.alienList.push(pAlien);
    }

    update(dt) {
        
        for (let i=this.alienList.length-1;i>=0;i--){
            let alien = this.alienList[i];
            if(alien.started == false) {
                alien.timer += dt;
                if(alien.timer >= alien.pendingDelay) {
                    alien.started = true;
                }
            }

            if (alien.started) {
                switch(this.shape){
                    case "sine":
                        alien.sprite.x += (Math.sin(alien.sprite.y/40)*alien.amplitude);
                        break;
                    case "circle":
                        alien.sprite.x += (Math.sin(alien.sprite.y/40)*alien.amplitude);
                        //alien.sprite.y += (Math.cos(alien.sprite.x/40)*alien.amplitude);
                        break;
                    default :
                        alien.sprite.x += 0;
                        break;
                }
                alien.update(dt);
                if(this.shootType != "NONE") {
                    alien.fire();
                }
                
                alien.sprite.y += alien.speed;
                if(alien.sprite.y > (canvas.height/SCALE) +  alien.sprite.tileSize.y){
                    this.alienList.splice(i,1);
                }
            }
        }
    }

    draw(pCtx) {
        this.alienList.forEach(alien => {
            alien.draw(pCtx);
        });
    }
}

class WavesManager {
    constructor(pGS){
        this.wavesList = [];
        this.gs = pGS;
    }

    addWave(pWave) {
        this.wavesList.push(pWave);
    }

    startWave(pWave) {
        pWave.started = true;
        console.log("Nouvelle vague!");
        for(let i=0;i<pWave.number;i++){
            let mySprite = new Sprite(pWave.sprite.img);
            Object.assign(mySprite,pWave.sprite);

            let alien = new Alien(mySprite,this.gs);
            alien.sprite.x = pWave.x;
            alien.sprite.y = pWave.y;
            alien.shootType = pWave.shootType;
            alien.speed = pWave.speed;

            switch(pWave.shape) {
                case "sine":
                    alien.sprite.x = pWave.x + (Math.sin(i)*pWave.shapePower);
                    alien.amplitude = 0.5;
                    alien.life = 3;
                    alien.points = 30;
                    break;
                case "slash":
                    alien.sprite.x = pWave.x + (i*pWave.shapePower);
                    alien.life = 10;
                    alien.points = 10;
                    break;
                case "circle":
                    alien.sprite.x = pWave.x;
                    alien.amplitude = 0.5;
                    alien.points = 30;
                    break;
                case "boss":
                    alien.sprite.x = pWave.x;
                    alien.life = 100;
                    alien.points = 500;
                default:
                    alien.sprite.x = pWave.x;
                    break;
            }
            alien.pendingDelay = i * pWave.pendingDelay;
            pWave.addAlien(alien);
        }
        
    }

    stopWave(pWave){
        let index = this.wavesList.indexOf(pWave);
        if(index != -1) {
            this.wavesList.splice(index,1);
            console.log("Vague supprimée")
        }
    }

    update(dt,pDistance) {
        this.wavesList.forEach(wave => {
            if(pDistance >= wave.startDistance && !wave.started) {
                this.startWave(wave);
            }
            if(wave.alienList.length == 0 && wave.started) {
                this.stopWave(wave);
            }
            if(wave.started){
                wave.update(dt);
            }
        });
    }

    draw(pCtx) {
        this.wavesList.forEach(wave => {
            if(wave.started){
                wave.draw(pCtx);
            }
        });
    }
}