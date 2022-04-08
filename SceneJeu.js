class SceneJeu {
    constructor() {
        this.gs = new GS(); // Game Services

        this.imageLoader = null;
        this.imgBackground = null;

        this.kbInputs = new Inputs(this.gs);
        this.bulletsManager = new BulletsManager(this.gs);
        this.wavesManager = new WavesManager(this.gs);
        
        this.gs.setBulletsManager(this.bulletsManager); // Ajoute le Bullets Manager au Game Service
        this.gs.setWavesManager(this.wavesManager);
    }

    load(pImageLoader) {
        this.gs.setPlayer(new Player(5,100,4,this.gs)); // Créer le Player dans le Game Services
        console.log(this.gs.wavesManager);

        this.imageLoader = pImageLoader;
        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new Sprite(this.imgBackground,0,0);

        this.imgBackgroundOverlay = this.imageLoader.getImage("images/background-overlay.png");
        this.backgroundOverlay = new ScrollingBackground(this.imgBackgroundOverlay);
        this.backgroundOverlay.setSpeed(1.5);

        let imgEnemyBall = this.imageLoader.getImage("images/enemies.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall);
        spriteEnemyBall.setTileSheet(16,16);
        spriteEnemyBall.currentFrame = 0;

        let imgEnemyBlade = this.imageLoader.getImage("images/enemies.png");
        let spriteEnemyBlade = new Sprite(imgEnemyBlade);
        spriteEnemyBlade.setTileSheet(16,16);
        spriteEnemyBlade.currentFrame = 1;

        let imgBoss01 = this.imageLoader.getImage("images/enemies.png");
        let spriteBoss01 = new Sprite(imgBoss01);
        spriteBoss01.setTileSheet(16,16);
        spriteBoss01.currentFrame = 12;

        this.wavesManager.addWave(new AlienWave(spriteEnemyBall,8,0.5,250,(canvas.width/SCALE)/2,-100,"sine",50,"SMALLB",1));
        this.wavesManager.addWave(new AlienWave(spriteEnemyBlade,8,0.3,1000,0,-100,"slash",20,"BRINGW",1));
        this.wavesManager.addWave(new AlienWave(spriteEnemyBall,1,0.5,1500,(canvas.width/SCALE)/2,-100,"line",50,"BOSS",1));

        /*// Particules
        this.pEmitter = new ParticleEmitter(100,100);
        for (let n=0;n<=50;n++) {
            this.pEmitter.add();
        }*/
    }

    update(dt) {
        this.backgroundOverlay.update(dt);
        this.kbInputs.update(dt,this.backgroundOverlay);
        this.wavesManager.update(dt,this.backgroundOverlay.distance);
        //this.pEmitter.update(dt);

        this.gs.player.update(dt);
        this.gs.bulletsManager.update(dt);
    }

    draw(pCtx) {
        pCtx.save();
        pCtx.scale(SCALE, SCALE);

        // Dessine le fond qui scrolle
        this.background.draw(pCtx);
        this.backgroundOverlay.draw(pCtx);

        this.wavesManager.draw(pCtx);

        //this.pEmitter.draw(pCtx);

        this.gs.player.draw(pCtx);
        this.gs.bulletsManager.draw(pCtx);

        pCtx.restore();
    }

    keypressed(pKey) {   
        //console.log(pKey);
    }
}