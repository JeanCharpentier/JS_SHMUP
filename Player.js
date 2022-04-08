class Player {
    constructor(pX,pY,pOffset,pGS) {
        this.gs = pGS;

        let imgShip = imageLoader.getImage("images/player.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(16,16);
        this.sprShip.currentFrame = 0;

        let imgLifes = imageLoader.getImage("images/chain.png");
        this.sprLifes = new Sprite(imgLifes,5,(canvas.height/SCALE)-16);
        this.sprLifes.setTileSheet(24,16);
        this.sprLifes.currentFrame = 5;

        /*let imgCanon = imageLoader.getImage("images/ShotTiny.png");
        this.sprCanon = new Sprite(imgCanon,pX,pY);
        this.sprCanon.setTileSheet(18,14);
        this.sprCanon.addAnimation("idle", [0,1], 0.2, true);
        this.sprCanon.startAnimation("idle");*/

        this.x = this.sprShip.x;
        this.y = this.sprShip.y;
        this.vx = 0;
        this.vy = 0;

        this.state = 0;
        this.animOffset = pOffset;
        this.canSwap = true;

        this.lifes = 3;

        this.showCanon = false;
    }

    fire() {
        let type = "PLAYERW"; // Change le sprite selon l'état du joueur
        if (this.state == 0) {
            type = "PLAYERW";
        }else if (this.state == 1) {
            type = "PLAYERB";
        }

        this.gs.bulletsManager.shoot(this.sprShip.x-3,this.sprShip.y,Math.PI/2,-5,type);
        this.gs.bulletsManager.shoot(this.sprShip.x+5,this.sprShip.y,Math.PI/2,-5,type);
    }

    update(dt) {
        this.sprShip.update(dt);
        //this.sprCanon.update(dt);
        this.sprShip.x = this.x + this.vx;
        this.sprShip.y = this.y + this.vy;
        this.x = this.sprShip.x;
        this.y = this.sprShip.y;        

        //let position = this.getShotPosition(14);
        //this.sprCanon.x = position.x - 5;
        //this.sprCanon.y = position.y;
    }

    draw(pCtx) {
        this.sprShip.draw(pCtx);

        this.sprLifes.draw(pCtx);
        /*if(this.showCanon) {
            this.sprCanon.draw(pCtx);
        }*/
    }
}