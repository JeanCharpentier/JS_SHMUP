class SceneJeu {
    constructor() {
        this.gs = new GS(); // Game Services

        this.imageLoader = null;
        this.imgBackground = null;

        this.kbInputs = new Inputs(this.gs);
        this.bulletsManager = new BulletsManager(this.gs);
        this.wavesManager = new WavesManager(this.gs);
       // this.pEmitter = new ParticleEmitter(100,100);
        
        this.gs.setBulletsManager(this.bulletsManager); // Ajoute le Bullets Manager au Game Service
        this.gs.setWavesManager(this.wavesManager);
        //this.gs.setPartEmitter();
    }

    load(pImageLoader) {
        this.gs.setPlayer(new Player(5,100,4,this.gs)); // Créer le Player dans le Game Services

        this.imageLoader = pImageLoader;

        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new Sprite(this.imgBackground,0,0);

        this.imgBackgroundOverlay = this.imageLoader.getImage("images/background-overlay.png");
        this.backgroundOverlay = new ScrollingBackground(this.imgBackgroundOverlay);
        this.backgroundOverlay.setSpeed(1.5);

        // Création des ennemis
        let imgEnemies = this.imageLoader.getImage("images/enemies.png");

        let sprEnWSmall = new Sprite(imgEnemies);
        sprEnWSmall.setTileSheet(16,16);
        sprEnWSmall.currentFrame = 8;

        let sprEnBSmall = new Sprite(imgEnemies);
        sprEnBSmall.setTileSheet(16,16);
        sprEnBSmall.currentFrame = 13;

        let sprBossB = new Sprite(imgEnemies);
        sprBossB.setTileSheet(16,16);
        sprBossB.currentFrame = 4;

        let sprBossW = new Sprite(imgEnemies);
        sprBossW.setTileSheet(16,16);
        sprBossW.currentFrame = 0;

        this.wavesManager.addWave(new AlienWave(sprEnWSmall,2,0.7,250,(canvas.width/SCALE)/2+30,-100,"sine",10,"SRINGW",1));
        this.wavesManager.addWave(new AlienWave(sprEnBSmall,8,0.7,250,(canvas.width/SCALE)/2-30,-100,"sine",10,"SRINGB",1));
        this.wavesManager.addWave(new AlienWave(sprEnBSmall,8,0.3,1500,0,-100,"slash",20,"SRINGB",1));
        this.wavesManager.addWave(new AlienWave(sprBossB,1,0.5,2000,(canvas.width/SCALE)/2,-100,"boss",50,"BOSSB",0.4));
    }

    update(dt) {
        this.backgroundOverlay.update(dt);
        this.kbInputs.update(dt,this.backgroundOverlay);
        this.wavesManager.update(dt,this.backgroundOverlay.distance);

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

        this.gs.player.draw(pCtx);
        this.gs.bulletsManager.draw(pCtx);

        pCtx.restore();
    }

    keypressed(pKey) {   
        //console.log(pKey);
    }
}