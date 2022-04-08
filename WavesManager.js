class Alien {
    constructor(pSprite,pGS) {
        this.sprite = pSprite;
        this.pendingDelay = 0;
        this.timer = 0;
        this.speed = 1;
        this.started = false;

        this.gs = pGS;

        this.angle = 1;
        this.angleOffset = 0;
        this.nbArms = 1;

        this.shootType = null;
        this.canShoot = false;
        this.shootSpeed = 2;
        this.shootTimer = 0;
        
    }

    update(dt) {
        this.sprite.update(dt);
        if(this.sprite.y > 0) {
            switch(this.shootType) {
                case "SMALLW":
                    this.canShoot = true;
                    this.shootSpeed = 0.1;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "SMALLB":
                    this.canShoot = true;
                    this.shootSpeed = 0.2;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "SRINGW":
                    this.canShoot = true;
                    this.shootSpeed = 0.2;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "SRINGB":
                    this.canShoot = true;
                    this.shootSpeed = 0.2;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "BRINGW":
                    this.canShoot = true;
                    this.shootSpeed = 0.2;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "BRINGB":
                    this.canShoot = true;
                    this.shootSpeed = 0.2;
                    this.angleOffset = 0;
                    this.nbArms = 1;
                    break;
                case "BOSS":
                    this.canShoot = true;
                    this.shootSpeed = 0.5;
                    this.angleOffset = 0.01;
                    this.nbArms = 4;
                    break;
                default:
                    this.canShoot = false;
                    break;

            }
        }
        
        this.shootTimer -= dt;
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }

    fire() {
        if(this.canShoot) {
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
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY,pShape="line",pShapePower=10,pShoot="",pSpeed=1) {
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
                alien.update(dt);
                alien.fire();
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
            if(pWave.shape == "line") {
                alien.sprite.x = pWave.x;
            }else if (pWave.shape == "sine") {
                alien.sprite.x = pWave.x + (Math.sin(i)*pWave.shapePower);
            }else if (pWave.shape == "slash") {
                alien.sprite.x = pWave.x + (i*pWave.shapePower);
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