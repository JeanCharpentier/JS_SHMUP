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
        this.background = new ScrollingBackground(this.imgBackground);
        this.background.speed = 1.5;

        this.player = new Player(5,100);

        let imgEnemyBall = this.imageLoader.getImage("images/enemyball.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall);
        spriteEnemyBall.setTileSheet(17,14);
        spriteEnemyBall.addAnimation("IDLE", [0,1,2,3,4,5,6,7,8,9,10],0.1,true);
        spriteEnemyBall.startAnimation("IDLE");

        let imgEnemyBlade = this.imageLoader.getImage("images/enemyblade.png");
        let spriteEnemyBlade = new Sprite(imgEnemyBlade);
        spriteEnemyBlade.setTileSheet(32,32);
        spriteEnemyBlade.addAnimation("IDLE", [0,1,2,3],0.1,true);
        spriteEnemyBlade.startAnimation("IDLE");

        this.wavesManager.addWave(new AlienWave(spriteEnemyBall,8,0,250,320,100,"slash",20));
        this.wavesManager.addWave(new AlienWave(spriteEnemyBlade,10,0.4,1000,320,100,"sine",50));

        /*// Particules
        this.pEmitter = new ParticleEmitter(100,100);
        for (let n=0;n<=50;n++) {
            this.pEmitter.add();
        }*/
    }

    update(dt) {
        this.background.update(dt);
        this.wavesManager.update(dt,this.background.distance);
        //this.pEmitter.update(dt);

        this.lstBullets.forEach(b => {
            b.update(dt);
        });

        if (this.keyboard["KeyS"] && this.player.y < 180) {
            this.player.y += 2;
        }
        if (this.keyboard["KeyW"] && this.player.y > 1) {
            this.player.y -= 2;
        }
        if (this.keyboard["KeyA"] && this.player.x > 1) {
            this.player.x -= 2;
        }
        if (this.keyboard["KeyD"] && this.player.x < 300) {
            this.player.x += 2;
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
        pCtx.scale(2, 2);

        // Dessine le fond qui scrolle
        this.background.draw(pCtx);
        this.wavesManager.draw(pCtx);
        //this.pEmitter.draw(pCtx);

        this.lstBullets.forEach(b => {
            b.draw(pCtx);
        });

        this.player.draw(pCtx);

        pCtx.restore();
    }

    shoot() {
        let position = this.player.getShotPosition(14);
        let b = new Bullet(position.x,position.y, 5,0,"PLAYER");
        this.lstBullets.push(b);
    }

    keypressed(pKey) {        
    }
}