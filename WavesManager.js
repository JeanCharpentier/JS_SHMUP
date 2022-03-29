class Alien {
    constructor(pSprite) {
        this.sprite = pSprite;
        this.pendingDelay = 0;
        this.timer = 0;
        this.speed = 1;
        this.started = false;
    }

    update(dt) {
        this.sprite.update(dt);
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }
}

class AlienWave {
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY,pShape="line",pShapePower=10) {
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
                    //console.log("un alien demarre en Y : "+alien.sprite.y);
                    alien.started = true;
                }
            }

            if (alien.started) {
                alien.update(dt);
                alien.sprite.x -= alien.speed;
                if(alien.sprite.x < 0 - alien.sprite.tileSize.x){
                    //console.log("del d'un alien hors ecran");
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

        if(pWave.currentWave != null){
            this.stopWave(pWave);
        }
        this.currentWave = pWave;
        for(let i=0;i<pWave.number;i++){
            let mySprite = new Sprite(pWave.sprite.img);
            Object.assign(mySprite,pWave.sprite);

            let alien = new Alien(mySprite);
            alien.sprite.x = pWave.x;
            if(pWave.shape == "line") {
                alien.sprite.y = pWave.y;
            }else if (pWave.shape == "sine") {
                alien.sprite.y = pWave.y + (Math.sin(i)*pWave.shapePower);
            }else if (pWave.shape == "slash") {
                alien.sprite.y = pWave.y - (i*pWave.shapePower);
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