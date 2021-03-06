let imageLoader = new ImageLoader();
let gameReady = false;

let sceneJeu = new SceneJeu();

let keyboard = [];



function toucheEnfoncee(t) {
    t.preventDefault();
    if(keyboard[t.code] == false || keyboard[t] == null) {
        sceneJeu.keypressed(t.code);
    }
    keyboard[t.code] = true;
}

function toucheRelachee(t) {
    t.preventDefault();
    keyboard[t.code] = false;
}

function load() {
    document.addEventListener("keydown", toucheEnfoncee, false);
    document.addEventListener("keyup", toucheRelachee, false);

    imageLoader.add("images/background.png");
    imageLoader.add("images/background-overlay.png");

    imageLoader.add("images/bullets.png");

    imageLoader.add("images/chain.png");
    imageLoader.add("images/energy.png");
    imageLoader.add("images/lifes.png");

    imageLoader.add("images/enemies.png");
    imageLoader.add("images/bosses.png")

    imageLoader.add("images/player.png");
    imageLoader.add("images/shield.png");

    imageLoader.add("images/explosion.png");

    imageLoader.add("images/powerups.png");

    imageLoader.add("images/buttons.png");

    // SONS
    imageLoader.add("sons/Explosion_02.mp3");
    imageLoader.add("sons/Explosion_03.mp3");
    imageLoader.add("sons/Hit_02.mp3");
    imageLoader.add("sons/Hit_03.mp3");
    imageLoader.add("sons/Shoot_00.mp3");
    imageLoader.add("sons/Song.ogg");

    imageLoader.start(startGame);
}

function startGame() {
    console.log("Start Game");

    lstSprites = [];

    sceneJeu.load(imageLoader);

    gameReady = true;
}

function update(dt) {
    if (!gameReady) {
        return;
    }
    // Suite quand le jeu est prêt
    sceneJeu.kbInputs.keyboard = keyboard;
    sceneJeu.update(dt);
}

function draw(pCtx) {
    if (!gameReady) {
        let ratio = imageLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 400, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 400 * ratio, 100);
        return;
    }
    sceneJeu.draw(pCtx);
    
}
