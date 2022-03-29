class Player {
    constructor(pX,pY,pOffset) {
        let imgShip = imageLoader.getImage("images/player.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(16,16);
        this.sprShip.currentFrame = 0;

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
        /*if(this.showCanon) {
            this.sprCanon.draw(pCtx);
        }*/
    }
}