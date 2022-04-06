class Alien {
    constructor(pSprite) {
        this.sprite = pSprite;
        this.pendingDelay = 0;
        this.timer = 0;
        this.speed = 1;
        this.started = false;

        this.shootType = null;
        this.canShoot = false;
        this.shootSpeed = 2;
        this.shootTimer = 0;

        this.bullets = [];
        
    }

    update(dt) {
        this.sprite.update(dt);
        if(this.sprite.y > 20) {
            if(this.shootType == "SMALLW") {
                this.canShoot = true;
                this.shootSpeed = 2;
            }
            if(this.shootType == "SMALLB") {
                this.canShoot = true;
                this.shootSpeed = 0.2;
            }
            if(this.shootType == "SRINGW") {
                this.canShoot = true;
                this.shootSpeed = 2;
            }
            if(this.shootType == "SRINGB") {
                this.canShoot = true;
                this.shootSpeed = 0.2;
            }
            if(this.shootType == "BRINGW") {
                this.canShoot = true;
                this.shootSpeed = 2;
            }
            if(this.shootType == "BRINGB") {
                this.canShoot = true;
                this.shootSpeed = 0.2;
            }
        }
        
        
        if(this.canShoot) {
            if(this.shootTimer <= 0) {
                this.shoot();
                this.shootTimer = this.shootSpeed;
            }
            this.shootTimer -= dt;

            this.bullets.forEach(b => {
                b.update(dt);
                b.isOutSideScreen(this.bullets);      
            });
        }
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
        this.bullets.forEach(b => {
            b.draw(pCtx);
        })
    }

    shoot() {
        console.log(this.shootType);
        let b = new Bullet(this.sprite.x,this.sprite.y,0,5,this.shootType);
        this.bullets.push(b);
    }
}

class AlienWave {
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY,pShape="line",pShapePower=10,pShoot="") {
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
    constructor(){
        this.wavesList = [];
        this.currentWave = null;
    }

    addWave(pWave) {
        this.wavesList.push(pWave);
    }

    startWave(pWave) {
        pWave.started = true;
        console.log("vague!");
        if(pWave.currentWave != null){
            this.stopWave(pWave);
        }
        this.currentWave = pWave;
        for(let i=0;i<pWave.number;i++){
            let mySprite = new Sprite(pWave.sprite.img);
            Object.assign(mySprite,pWave.sprite);

            let alien = new Alien(mySprite);
            alien.sprite.x = pWave.x;
            alien.sprite.y = pWave.y;
            alien.shootType = pWave.shootType;
            //console.log(alien.shootType);
            if(pWave.shape == "line") {
                alien.sprite.x = pWave.x;
            }else if (pWave.shape == "sine") {
                alien.sprite.x = pWave.x + (Math.sin(i)*pWave.shapePower);
            }else if (pWave.shape == "slash") {
                alien.sprite.x = pWave.x + (i*pWave.shapePower);
            }
            alien.pendingDelay = i * pWave.pendingDelay;
            pWave.addAlien(alien);
            //console.log("Creer Alien "+ i);
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
        });
        if(this.currentWave != null) {
            this.currentWave.update(dt);
        }
    }

    draw(pCtx) {
        if(this.currentWave != null) {
            this.currentWave.draw(pCtx);
        }
    }
}