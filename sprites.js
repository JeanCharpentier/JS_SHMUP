class Sprite{
    constructor(pSrc,pX=0,pY=0,pW=100,pH=100){
        this.img = pSrc;
        this.x = pX;
        this.y = pY;
        this.width = pW;
        this.height = pH;
    }

    draw(pCtx) {
        pCtx.drawImage(this.img,this.x,this.y);
    }
}

function loadImages() {
    imageLoader.add("images/background.png");
    imageLoader.add("images/BossEye.png");
    imageLoader.add("images/enemyball.png");
    imageLoader.add("images/enemyblade.png");
    imageLoader.add("images/enemyred.png");
    imageLoader.add("images/enemywheel.png");
    imageLoader.add("images/Explosion1.png");
    imageLoader.add("images/Explosion2.png");
    imageLoader.add("images/Explosion3.png");
    imageLoader.add("images/Explosion4.png");
    imageLoader.add("images/Laser.png");
    imageLoader.add("images/player.png");
    imageLoader.add("images/PowerUps.png");
    imageLoader.add("images/ShotBasic.png");
    imageLoader.add("images/ShotBig1.png");
    imageLoader.add("images/ShotBig2.png");
    imageLoader.add("images/ShotBig3.png");
    imageLoader.add("images/ShotBig4.png");
    imageLoader.add("images/ShotBig5.png");
    imageLoader.add("images/ShotBoss.png");
    imageLoader.add("images/shotBoss2_2.png");
    imageLoader.add("images/shotBoss2_3.png");
    imageLoader.add("images/shotBoss2_4.png");
    imageLoader.add("images/ShotTiny.png");
    imageLoader.add("images/Walker.png");
}