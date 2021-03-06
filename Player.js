class Player {
    constructor(pX,pY,pOffset,pGS) {
        this.gs = pGS;

        this.state = 0;
        this.animOffset = pOffset;
        this.canSwap = true;

        let imgShip = imageLoader.getImage("images/player.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(16,16);
        this.sprShip.currentFrame = 0;
        this.sprShip.addAnimation("blink",[0+this.animOffset,3+this.animOffset],0.15,5);

        let imgEnergy = imageLoader.getImage("images/energy.png");
        this.sprEnergy = new Sprite(imgEnergy,5,(canvas.height/SCALE)-16);
        this.sprEnergy.setTileSheet(48,16);
        this.sprEnergy.currentFrame = 5;

        let imgLifes = imageLoader.getImage("images/lifes.png");
        this.sprLifes = new Sprite(imgLifes,(canvas.width/SCALE)-imgLifes.width-5,(canvas.height/SCALE)-16);
        this.sprLifes.setTileSheet(24,16);
        this.sprLifes.currentFrame = 0;

        let imgShield = imageLoader.getImage("images/shield.png");
        this.sprShield = new Sprite(imgShield,(canvas.width/SCALE)-imgLifes.width-5,(canvas.height/SCALE)-16);
        this.sprShield.setTileSheet(32,32);
        this.sprShield.currentFrame = 0;

        let imgExplo = imageLoader.getImage("images/explosion.png");
        this.sprExplo = new Sprite(imgExplo,pX,pY);
        this.sprExplo.setTileSheet(16,16);
        this.sprExplo.currentFrame = 0;
        this.sprExplo.addAnimation("explo",[0,1,2],0.15,1);

        this.x = this.sprShip.x;
        this.y = this.sprShip.y;
        this.vx = 0;
        this.vy = 0;

        this.lifes = PLIFES;
        this.energy = PENERGY;

        this.showCanon = false;
        this.score = 0;

        this.powerup = "NONE";
        this.puTimer = 5;
        this.puChrono = 5;
    }

    fire() {
        let type = "PLAYERW"; // Change le sprite selon l'état du joueur
        if (this.state == 0) {
            type = "PLAYERW";
        }else if (this.state == 1) {
            type = "PLAYERB";
        }
        if(this.powerup == "QUAD") {
            this.gs.bulletsManager.shoot(this.sprShip.x-8,this.sprShip.y,rad(0),-5,type,0);
            this.gs.bulletsManager.shoot(this.sprShip.x+10,this.sprShip.y,rad(0),-5,type,0);
        }
        this.gs.bulletsManager.shoot(this.sprShip.x-3,this.sprShip.y,rad(0),-5,type,0);
        this.gs.bulletsManager.shoot(this.sprShip.x+5,this.sprShip.y,rad(0),-5,type,0);
    }

    update(dt) {
        this.sprLifes.currentFrame = this.lifes;
        this.sprEnergy.currentFrame = this.energy;
        this.sprLifes.update(dt);
        this.sprExplo.update(dt);

        this.sprShip.update(dt);
        this.sprShip.x = this.x + this.vx;
        this.sprShip.y = this.y + this.vy;
        this.x = this.sprShip.x;
        this.y = this.sprShip.y;     
        
        if(this.powerup == "SHIELD") {
            this.sprShield.x = this.x - (this.sprShield.tileSize.x/4);
            this.sprShield.y = this.y - (this.sprShield.tileSize.y/4);
            this.sprShield.update(dt);
        }
        if(this.powerup != "NONE") {
            this.puTimer -= dt;
            if(this.puTimer <=0) {
                this.puTimer = this.puChrono;
                this.powerup = "NONE";
            }
        }
    }

    draw(pCtx) {
        this.sprShip.draw(pCtx);

        if(this.powerup == "SHIELD") {
            this.sprShield.draw(pCtx);
        }

        this.sprExplo.draw(pCtx);
        this.sprLifes.draw(pCtx);
        this.sprEnergy.draw(pCtx);


        pCtx.fillStyle = "Orange";
        pCtx.textAlign = "right";
        pCtx.font = "normal "+ 16/SCALE + "pt Arial";
        pCtx.fillText("Score : " + this.score,(canvas.width/SCALE)-(10/SCALE),20/SCALE);
    }
}