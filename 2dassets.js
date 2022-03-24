class Sprite{
    constructor(pSrc,pX=0,pY=0){
        this.img = new Image();
        this.img.src = pSrc;
        this.x = pX;
        this.y = pY;
    }

    draw(pCtx) {
        pCtx.drawImage(this.img,this.x,this.y);
    }
}

class Background{
    constructor(pSrc,pY=0,pScale=1) {
        this.img = new Image();
        this.img.src = pSrc;
        this.y = pY;
        this.width = 400;
    }

    draw(pCtx){
        pCtx.drawImage(this.img,0,this.y)
    }
}