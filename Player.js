class Player {
    constructor(pX,pY,pOffset) {
        let imgShip = imageLoader.getImage("images/player.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(16,16);
        this.sprShip.currentFrame = 0;

        this.sprShipBlack = new Sprite(imgShip,pX,pY);
        this.sprShipBlack.setTileSheet(16,16);
        this.sprShipBlack.currentFrame = 4;

        /*let imgCanon = imageLoader.getImage("images/ShotTiny.png");
        this.sprCanon = new Sprite(imgCanon,pX,pY);
        this.sprCanon.setTileSheet(18,14);
        this.sprCanon.addAnimation("idle", [0,1], 0.2, true);
        this.sprCanon.startAnimation("idle");*/

        this.x = this.sprShip.x;
        this.y = this.sprShip.y;

        this.state = 0;
        this.animOffset = pOffset;
        this.canSwap = true;

        this.showCanon = false;
    }


    getShotPosition(pBulletHeight) {
        let position = {x:0,y:0};
        let midShip = this.x + (this.sprShip.tileSize.x/2) - (pBulletHeight/2);
        position.y = this.y - (this.sprShip.tileSize.y);
        position.x = midShip;
        return position;
    }

    update(dt) {
        if (this.state == 0) {
            this.sprShip.update(dt);
            //this.sprCanon.update(dt);
            this.sprShip.x = this.x;
            this.sprShip.y = this.y;
        } else if (this.state == 1) {
            this.sprShipBlack.update(dt);
            //this.sprCanon.update(dt);
            this.sprShipBlack.x = this.x;
            this.sprShipBlack.y = this.y;
        }
        

        //let position = this.getShotPosition(14);
        //this.sprCanon.x = position.x - 5;
        //this.sprCanon.y = position.y;
    }

    draw(pCtx) {
        if (this.state == 0) {
            this.sprShip.draw(pCtx);
            /*if(this.showCanon) {
                this.sprCanon.draw(pCtx);
            }*/
        }else if (this.state == 1) {
            this.sprShipBlack.draw(pCtx);
            /*if(this.showCanon) {
                this.sprCanon.draw(pCtx);
            }*/
        }
        
    }
}