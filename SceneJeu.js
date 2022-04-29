class SceneJeu {
    constructor() {
        this.gs = new GS();

        this.imageLoader = null;
        this.imgBackground = null;

        this.levels = null;

        this.puManager = new PowerupManager(this.gs);
        this.popupManager = new PopupManager();

        this.kbInputs = new Inputs(this.gs);
        this.bulletsManager = new BulletsManager(this.gs);
        this.wavesManager = new WavesManager(this.gs);
        
        this.menu = null;
        
        this.gs.setBulletsManager(this.bulletsManager); // Ajoute le Bullets Manager au Game Service
        this.gs.setWavesManager(this.wavesManager);
        this.gs.setPUManager(this.puManager);
        this.gs.setPopupManager(this.popupManager);      
    }

    load(pImageLoader) {
        this.imageLoader = pImageLoader;

        this.levels = new LevelLoader(this.gs);

        this.menu = new Menu(this.gs);
        this.gs.setMenu(this.menu);

        this.gs.setPlayer(new Player((canvas.width/SCALE)/2,(canvas.height/SCALE)-50,4,this.gs)); // Créer le Player dans le Game Services
        
        // Création des fonds
        this.imgBackground = this.imageLoader.getImage("images/background.png");
        this.background = new Sprite(this.imgBackground,0,0);

        this.imgBackgroundOverlay = this.imageLoader.getImage("images/background-overlay.png");
        this.backgroundOverlay = new ScrollingBackground(this.imgBackgroundOverlay);
        this.backgroundOverlay.setSpeed(1.5);

        // Création des niveaux
        //this.levels.createLevel(1);


        // Création des boutons du menu
        this.menu.addButton("Play","GAME");
        this.menu.addButton("Credits","CREDITS");

        // Création des sons
        let sndMusic = this.imageLoader.getImage("sons/Song.ogg");
        sndMusic.addEventListener('ended', function() {
            if(!debugSound) {
                this.volume = 0.2;
            }else{
                this.volume = 0;
            }
            this.currentTime = 0;
            this.play();
        },false);
        sndMusic.volume = 0.2;
        //sndMusic.play();
    }

    update(dt) {
        this.kbInputs.update(dt,this.backgroundOverlay);

        if(this.gs.gamemode == "MENU") {
            this.gs.menu.update(dt);
        }else if(this.gs.gamemode == "GAME"){
            this.backgroundOverlay.update(dt);
            this.wavesManager.update(dt,this.backgroundOverlay.distance);
            this.puManager.update(dt);
            this.gs.player.update(dt);
            this.gs.bulletsManager.update(dt);
            this.gs.popupManager.update(dt);
        }else if(this.gs.gamemode == "PAUSE"){

        }
        // Fin de vague / victoire
        if(this.gs.wavesManager.wavesList.length == 0){
            this.gs.gamemode = "MENU";
        }
    }

    draw(pCtx) {
        pCtx.save();
        pCtx.scale(SCALE, SCALE);

        // Dessine le fond qui scrolle
        this.background.draw(pCtx);
        this.backgroundOverlay.draw(pCtx);

        if(this.gs.gamemode == "MENU") {
            this.gs.menu.draw(pCtx);
        }else if(this.gs.gamemode == "GAME" || this.gs.gamemode == "PAUSE"){
            this.wavesManager.draw(pCtx);
            this.puManager.draw(pCtx);
            this.gs.player.draw(pCtx);
            this.gs.bulletsManager.draw(pCtx);
            this.gs.popupManager.draw(pCtx);
        }else if(this.gs.gamemode == "CREDITS"){
            pCtx.fillText("Les crédits", 50, (canvas.height/SCALE)-50);
        }else if(this.gs.gamemode == "GO"){
            pCtx.fillText("GAME OVER", 50, 100);
        }     
        pCtx.restore();
    }

    keypressed(pKey) {   
        //console.log(pKey);

        // MENU
        if(pKey == "ArrowDown") {
            if(this.gs.menu.index < this.gs.menu.buttons.length-1){
                this.gs.menu.index += 1;
            } 
        }
        if(pKey == "ArrowUp") {
            if(this.gs.menu.index > 0){
                this.gs.menu.index -= 1;
            } 
        }

        if(pKey == "Enter"){
            this.gs.gamemode = this.gs.menu.buttons[this.gs.menu.index].mode;
            if(this.gs.gamemode == "GAME") {
                this.gs.wavesManager.wavesList = [];
                this.gs.player.lifes = PLIFES;
                this.gs.player.energy = PENERGY;
                this.gs.player.x = (canvas.width/SCALE)/2;
                this.gs.player.y = (canvas.height/SCALE)-50;
                this.gs.player.score = 0;
                this.levels.createLevel(1);
            }
        }

        // PAUSE
        if(pKey == "Escape") {
            if(this.gs.gamemode == "PAUSE"){
                this.gs.gamemode = "GAME";
            }else if(this.gs.gamemode == "GAME") {
                this.gs.gamemode = "PAUSE";
            }else{
                this.gs.gamemode = "MENU";
            }
        }
        // DEBUG
        if(pKey == "F9"){
            if(debugMode) {
                debugMode = false;
            }else {
                debugMode = true;
            }
        }
        if(pKey == "F10"){
            if(debugSound) {
                debugSound = false;
            }else {
                debugSound = true;
            }
        }
    }
}