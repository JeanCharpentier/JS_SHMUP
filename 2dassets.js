class Sprite{
    constructor(pSrc,pX=0,pY=0,pW=100,pH=100){
        this.img = pSrc;
        this.x = pX;
        this.y = pY;
        this.width = pW;
        this.height = pH;
    }

    draw(pCtx) {
        pCtx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}

function loadImages() {
    imageLoader.add("images/background.png");
    imageLoader.add("images/background-overlay.png");

    imageLoader.add("images/player.png");

    imageLoader.add("images/bullets.png");
    imageLoader.add("images/chain.png");

    imageLoader.add("images/enemies.png");

    imageLoader.add("images/explosion1.png");
    imageLoader.add("images/explosion2.png");
    imageLoader.add("images/explosion3.png");
}