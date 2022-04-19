class SceneJeu {
    constructor() {
        this.gs = new GS(); // Game Services

        this.imageLoader = null;
        this.imgBackground = null;

        this.puManager = new PowerupManager(this.gs);

        this.kbInputs = new Inputs(this.gs);
        this.bulletsManager = new BulletsManager(this.gs);
        this.wavesManager = new WavesManager(this.gs);
        
        this.gs.setBulletsManager(this.bulletsManager); // Ajoute le Bullets Manager au Game Service
        this.gs.setWavesManager(this.wavesManager);
        this.gs.setPUManager(this.puManager);
    }

    load(pImageLoader) {
        this.imageLoader = pImageLoader;

        this.gs.setPlayer(new Player((canvas.width/SCALE)/2,(canvas.height/SCALE)-50,4,this.gs)); // Créer le Player dans le Game Services

        

        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new Sprite(this.imgBackground,0,0);

        this.imgBackgroundOverlay = this.imageLoader.getImage("images/background-overlay.png");
        this.backgroundOverlay = new ScrollingBackground(this.imgBackgroundOverlay);
        this.backgroundOverlay.setSpeed(1.5);

        // Création des ennemis
        let imgEnemies = this.imageLoader.getImage("images/enemies.png");
        let imgBosses = this.imageLoader.getImage("images/bosses.png");

        let sprEnWSmall = new Sprite(imgEnemies);
        sprEnWSmall.setTileSheet(16,16);
        sprEnWSmall.currentFrame = 8;

        let sprEnBSmall = new Sprite(imgEnemies);
        sprEnBSmall.setTileSheet(16,16);
        sprEnBSmall.currentFrame = 13;

        let sprBossB = new Sprite(imgBosses);
        sprBossB.setTileSheet(32,32);
        sprBossB.currentFrame = 0;
        sprBossB.addAnimation("spin",[0,1,2,3],0.1,true);
        sprBossB.startAnimation("spin");

        let sprBossW = new Sprite(imgBosses);
        sprBossW.setTileSheet(32,32);
        sprBossW.currentFrame = 0;

        this.wavesManager.addWave(new AlienWave(sprEnWSmall,5,0.7,250,(canvas.width/SCALE)/2+30,-100,"sine",10,"SRINGW",1));
        this.wavesManager.addWave(new AlienWave(sprEnWSmall,5 ,0.7,250,(canvas.width/SCALE)/2-30,-100,"sine",10,"SRINGW",1));
        this.wavesManager.addWave(new AlienWave(sprEnBSmall,8,0.3,1500,0,-100,"slash",20,"SRINGB",1));
        this.wavesManager.addWave(new AlienWave(sprBossB,1,0.5,2000,(canvas.width/SCALE)/2,-100,"boss",50,"BOSSB",0.4));
    }

    update(dt) {
        this.backgroundOverlay.update(dt);
        this.kbInputs.update(dt,this.backgroundOverlay);
        this.wavesManager.update(dt,this.backgroundOverlay.distance);

        this.puManager.update(dt);
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

        this.puManager.draw(pCtx);

        this.gs.player.draw(pCtx);
        this.gs.bulletsManager.draw(pCtx);

        pCtx.restore();
    }

    keypressed(pKey) {   
        //console.log(pKey);
    }
}