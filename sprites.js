class Sprite{
    constructor(pSrc,pX=0,pY=0){
        this.img = pSrc;
        this.x = pX;
        this.y = pY;
        this.scaleX = 1;
        this.scaleY = 1;

        this.currentFrame = 0;
        this.currentFrameInAnimation = 0;
        this.currentAnimation = null;
        this.frameTimer = 0;

        this.tileSize = {
            x:0,
            y:0
        }
        this.tileSheet = false;
        
        // ANIMATIONS
        this.animations = [];
    }

    addAnimation(pName, pFrames, pSpeed, pLoop = true) {
        let animation = {
            name: pName,
            frames: pFrames,
            speed: pSpeed,
            loop: pLoop,
            end: false
        }
        this.animations.push(animation);
    }

    startAnimation(pName) {
        if(this.currentAnimation != null) {
            if(this.currentAnimation.name == pName) {
                return;
            }
        }
        this.animations.forEach(animation => {
            if(animation.name == pName) {
                this.currentAnimation = animation;
                this.currentFrameInAnimation = 0;
                this.currentFrame = this.currentAnimation.frames[this.currentFrameInAnimation];
                this.currentAnimation.end = false;
            }
        });
    }

    setTileSheet(pSizeX,pSizeY) {
        this.tileSheet = true;
        this.tileSize.x = pSizeX;
        this.tileSize.y = pSizeY;
    }

    setScale(pX,pY) {
        this.scaleX = pX;
        this.scaleY = pY;
    }

    update(dt) {
        if(this.currentAnimation != null) {
            this.frameTimer += dt;
            if(this.frameTimer >= this.currentAnimation.speed) {
                this.frameTimer = 0;
                this.currentFrameInAnimation++;
                if(this.currentFrameInAnimation > this.currentAnimation.frames.length - 1) {
                    if(this.currentAnimation.loop) {
                        this.currentFrameInAnimation = 0;
                    }else {
                        this.currentFrameInAnimation = this.currentAnimation.frames.length - 1;
                        this.currentAnimation.end = true;
                    }
                }
                this.currentFrame = this.currentAnimation.frames[this.currentFrameInAnimation];
            }
        }
    }

    draw(pCtx) {
        if (!this.tileSheet) {
            pCtx.drawImage(this.img,this.x,this.y);
        } else {
            let nbCol = this.img.width / this.tileSize.x;
            let c = 0;
            let l = 0;

            l = Math.floor(this.currentFrame / nbCol);
            c = this.currentFrame - (l*nbCol);

            let x = c * this.tileSize.x;
            let y = l * this.tileSize.y;

            pCtx.drawImage(this.img,x,y,this.tileSize.x,this.tileSize.y,this.x,this.y,this.tileSize.x*this.scaleX,this.tileSize.y*this.scaleY)
        }
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