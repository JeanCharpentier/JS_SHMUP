const SCALE = 2.5;
const BG_SPEED = 1.5;
const LOOT_RATE = 10;

function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function rad(deg) {
    return deg * (Math.PI / 180);
}

function isColliding(px1,py1,pw1,ph1,px2,py2,pw2,ph2){
    if(px1<px2+pw2 && px2<px1+pw1 && py1<py2+ph2 && py2<py1+ph1) {
        return true;
    }else {
        return false;
    }
}

function getExtension(pFile=""){
    let ext = pFile.split(".");
    return ext[ext.length-1];
}

class GS{
    constructor() {
        this.player = null;
        this.bulletsManager = null;
        this.wavesManager = null;
        this.partEmitter = null;
        this.puManager = null;
        this.popupManager = null;
        this.kbInputs = null;
        this.menu = null;
        this.soundManager = null;

        this.gamemode = "MENU";
    }

    setPlayer(pPlayer){
        this.player = pPlayer;
    }

    setBulletsManager(pBManager) {
        this.bulletsManager = pBManager;
    }
    setWavesManager(pWManager) {
        this.wavesManager = pWManager;
    }
    setPartEmitter(pEmitter) {
        this.partEmitter = pEmitter;
    }

    setPUManager(pPUManager) {
        this.puManager = pPUManager;
    }

    setPopupManager(pPopupManager) {
        this.popupManager = pPopupManager;
    }

    setKBInputs(pKBInputs) {
        this.kbInputs = pKBInputs;
    }

    setMenu(pMenu) {
        this.menu = pMenu;
    }

    setSoundManager(pSManager) {
        this.soundManager = pSManager;
    }
}

class Inputs{
    constructor(pGS){
        this.gs = pGS;

        this.keyboard = null;

        this.shotSpeed = 0.1;
        this.shotTimer = 0;
    }

    update(dt,pBGO) {
        if (!this.keyboard["KeyQ"]) {
            this.gs.player.canSwap = true;
        }

        if (this.keyboard["KeyQ"] && this.gs.player.canSwap == true) {
            this.gs.player.canSwap = false;
            if (this.gs.player.state == 0) {
                this.gs.player.state = 1;
            }else if (this.gs.player.state == 1 ) {
                this.gs.player.state = 0;
            }
        }

        if (this.keyboard["KeyS"] && this.gs.player.y < (canvas.height/SCALE) - this.gs.player.sprShip.tileSize.y - 1) {
            this.gs.player.vy = 2;
            pBGO.setSpeed(BG_SPEED - 0.3);
        }else if (this.keyboard["KeyW"] && this.gs.player.y > 1/SCALE) {
            this.gs.player.vy = -2;
            pBGO.setSpeed(BG_SPEED + 1);
        }else {
            this.gs.player.vy = 0;
        }
        if (this.keyboard["KeyA"] && this.gs.player.x > 1/SCALE) {
            this.gs.player.vx = -2;
            if (this.gs.player.state == 0) {
                this.gs.player.sprShip.currentFrame = 2;
            }else if (this.gs.player.state == 1 ) {
                this.gs.player.sprShip.currentFrame = 2 + this.gs.player.animOffset;
            }
        }else if (this.keyboard["KeyD"] && this.gs.player.x < (canvas.width/SCALE)- this.gs.player.sprShip.tileSize.x - 1) {
            this.gs.player.vx = 2;
            if (this.gs.player.state == 0) {
                this.gs.player.sprShip.currentFrame = 1;
            }else if (this.gs.player.state == 1 ) {
                this.gs.player.sprShip.currentFrame = 1 + this.gs.player.animOffset;
            }
        }else {
            this.gs.player.vx = 0;
        }


        if(!this.keyboard["KeyD"] && !this.keyboard["KeyA"]) {
            this.gs.player.vx = 0;
            if (this.gs.player.state == 0) {
                this.gs.player.sprShip.currentFrame = 0;
            }else if (this.gs.player.state == 1 ) {
                this.gs.player.sprShip.currentFrame = 0 + this.gs.player.animOffset;
            }
        }
        if(!this.keyboard["KeyS"] && !this.keyboard["KeyW"]) {
            this.gs.player.vy = 0;
            pBGO.setSpeed(BG_SPEED);
        }



        if (this.keyboard["Space"]) {
            this.gs.player.showCanon = true;
            if(this.shotTimer <= 0) {
                this.gs.player.fire();
                this.shotTimer = this.shotSpeed;
            }
        } else {
            this.gs.player.showCanon = false;
        }

        // Tir automatique "On Hold"
        if(this.shotTimer >= 0) {
            this.shotTimer -= dt;
        }
    }
}


/*
  ____  _____ ____  _   _  ____ 
 |  _ \| ____| __ )| | | |/ ___|
 | | | |  _| |  _ \| | | | |  _ 
 | |_| | |___| |_) | |_| | |_| |
 |____/|_____|____/ \___/ \____|
                                
 */

 debugMode = false;