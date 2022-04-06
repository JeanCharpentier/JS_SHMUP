class SceneJeu {
    constructor() {
        this.keyboard = null;
        this.imageLoader = null;
        this.imgBackground = null;

        this.wavesManager = new WavesManager();

        this.lstBullets = [];

        this.shotSpeed = 0.1;
        this.shotTimer = 0;
    }

    load(pImageLoader) {
        this.imageLoader = pImageLoader;
        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new Sprite(this.imgBackground,0,0);

        this.imgBackgroundOverlay = this.imageLoader.getImage("images/background-overlay.png");
        this.backgroundOverlay = new ScrollingBackground(this.imgBackgroundOverlay);
        this.backgroundOverlay.speed = 1.5;

        this.player = new Player(5,100,4);

        let imgEnemyBall = this.imageLoader.getImage("images/enemies.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall);
        spriteEnemyBall.setTileSheet(16,16);
        spriteEnemyBall.currentFrame = 0;

        let imgEnemyBlade = this.imageLoader.getImage("images/enemies.png");
        let spriteEnemyBlade = new Sprite(imgEnemyBlade);
        spriteEnemyBlade.setTileSheet(16,16);
        spriteEnemyBlade.currentFrame = 1;

        this.wavesManager.addWave(new AlienWave(spriteEnemyBall,8,0.1,250,0,-100,"sine",20));
        this.wavesManager.addWave(new AlienWave(spriteEnemyBlade,11,0.3,500,0,-100,"slash",10));

        /*// Particules
        this.pEmitter = new ParticleEmitter(100,100);
        for (let n=0;n<=50;n++) {
            this.pEmitter.add();
        }*/
    }

    update(dt) {
        this.backgroundOverlay.update(dt);
        this.wavesManager.update(dt,this.backgroundOverlay.distance);
        //this.pEmitter.update(dt);
        //this.bulletsManager.update();

        this.lstBullets.forEach(b => {
            b.update(dt);
        });

        if (!this.keyboard["KeyQ"]) {
            this.player.canSwap = true;
        }

        if (this.keyboard["KeyQ"] && this.player.canSwap == true) {
            this.player.canSwap = false;
            if (this.player.state == 0) {
                this.player.state = 1;
            }else if (this.player.state == 1 ) {
                this.player.state = 0;
            }
        }


        if (this.keyboard["KeyS"] && this.player.y < (canvas.height/SCALE) - this.player.sprShip.tileSize.y - 1) {
            this.player.vy = 2;
            this.backgroundOverlay.speed = 1.5 - 0.3;
        }
        if (this.keyboard["KeyW"] && this.player.y > 1/SCALE) {
            this.player.vy = -2;
            this.backgroundOverlay.speed = 1.5 + 1;
        }
        if (this.keyboard["KeyA"] && this.player.x > 1/SCALE) {
            this.player.vx = -2;
            if (this.player.state == 0) {
                this.player.sprShip.currentFrame = 2;
            }else if (this.player.state == 1 ) {
                this.player.sprShip.currentFrame = 2 + this.player.animOffset;
            }
        }
        if (this.keyboard["KeyD"] && this.player.x < (canvas.width/SCALE)- this.player.sprShip.tileSize.x - 1) {
            this.player.vx = 2;
            if (this.player.state == 0) {
                this.player.sprShip.currentFrame = 1;
            }else if (this.player.state == 1 ) {
                this.player.sprShip.currentFrame = 1 + this.player.animOffset;
            }
        }
        if(!this.keyboard["KeyD"] && !this.keyboard["KeyA"]) {
            this.player.vx = 0;
            if (this.player.state == 0) {
                this.player.sprShip.currentFrame = 0;
            }else if (this.player.state == 1 ) {
                this.player.sprShip.currentFrame = 0 + this.player.animOffset;
            }
        }
        if(!this.keyboard["KeyS"] && !this.keyboard["KeyW"]) {
            this.player.vy = 0;
            this.backgroundOverlay.speed = 1.5;
        }



        if (this.keyboard["Space"]) {
            this.player.showCanon = true;
            if(this.shotTimer <= 0) {
                this.shoot();
                this.shotTimer = this.shotSpeed;
            }
        } else {
            this.player.showCanon = false;
        }

        if(this.shotTimer >= 0) {
            this.shotTimer -= dt;
        }

        this.player.update(dt);
    }

    draw(pCtx) {
        pCtx.save();
        pCtx.scale(SCALE, SCALE);

        // Dessine le fond qui scrolle
        this.background.draw(pCtx);
        this.backgroundOverlay.draw(pCtx);

        this.wavesManager.draw(pCtx);

        //this.bulletsManager.draw(pCtx);

        //this.pEmitter.draw(pCtx);

        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });

        this.player.draw(pCtx);

        pCtx.restore();
    }

    shoot() {
        let type = "PLAYERW";
        if (this.player.state == 0) {
            type = "PLAYERW";
        }else if (this.player.state == 1) {
            type = "PLAYERB";
        }
        let position = this.player.getShotPosition(16);
        let bL = new Bullet(position.x-3,position.y+10, 0,-5,type);
        let bR = new Bullet(position.x+5,position.y+10, 0,-5,type);
        this.lstBullets.push(bL);
        this.lstBullets.push(bR);
    }

    keypressed(pKey) {   
        //console.log(pKey);
    }
}