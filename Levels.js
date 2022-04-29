class LevelLoader{
    constructor(pGS){
        this.gs = pGS;
        let imgEnemies = imageLoader.getImage("images/enemies.png");
        let imgBosses = imageLoader.getImage("images/bosses.png");

        this.sprEnWSmall = new Sprite(imgEnemies,0,0);
        this.sprEnWSmall.setTileSheet(16,16);
        this.sprEnWSmall.currentFrame = 8;

        this.sprEnBSmall = new Sprite(imgEnemies,0,0);
        this.sprEnBSmall.setTileSheet(16,16);
        this.sprEnBSmall.currentFrame = 13;

        this.sprBossB = new Sprite(imgBosses,0,0);
        this.sprBossB.setTileSheet(32,32);
        this.sprBossB.currentFrame = 0;
        this.sprBossB.addAnimation("spin",[0,1,2,3],0.05,0);
        this.sprBossB.startAnimation("spin");

        this.sprBossW = new Sprite(imgBosses,0,0);
        this.sprBossW.setTileSheet(32,32);
        this.sprBossW.currentFrame = 0;
    }

    createLevel(pLevel){
        switch(pLevel) {
            case 1:
                this.gs.wavesManager.addWave(new AlienWave(this.sprEnWSmall,5,0.7,250,(canvas.width/SCALE)/2+30,-100,"sine",10,"SRINGW",1));
                this.gs.wavesManager.addWave(new AlienWave(this.sprEnWSmall,5 ,0.7,250,(canvas.width/SCALE)/2-30,-100,"sine",10,"SRINGW",1));
                this.gs.wavesManager.addWave(new AlienWave(this.sprEnBSmall,8,0.3,1500,0,-100,"slash",20,"SRINGB",1));
                this.gs.wavesManager.addWave(new AlienWave(this.sprEnBSmall,8,0.3,2000,0,-100,"slash",20,"SRINGB",1));
                this.gs.wavesManager.addWave(new AlienWave(this.sprBossB,1,0.5,2500,(canvas.width/SCALE)/2,-100,"boss",50,"BOSSB",0.4));
                break;
            case 2:
    
                break;
            case 3:
    
                break;
            default:
                console.error("Erreur de chargement de niveau !");
                break;
        }
        this.gs.wavesManager.setMaxWaves();
    }
}