let img;

let imageLoader = new ImageLoader();
let gameReady = false;
let lstSprites = [];

let spriteEnemy = null;
let spritePlayer = null;

let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;


function load() {

    document.addEventListener("keydown", kbDown, false);
    document.addEventListener("keyup", kbUp, false);

    loadImages(); // Charge les images dans l'ImageLoader

    imageLoader.start(startGame);
}

function update(dt) {
    
    if (!gameReady) {
        return;
    }

    if(keyRight){
        
    }
    if(keyLeft){

    }
    if(keyUp){

    }
    if(keyDown){

    }

    // Update des sprites
    lstSprites.forEach(sprite => {
        sprite.update(dt);
    });

    if(spritePlayer.currentAnimation.end) {
        spritePlayer.startAnimation("TURNRIGHT");
    }
}

function draw(pCtx) {

    if (!gameReady) {
        let ratio = imageLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1,1,400,100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1,1,400*ratio,100);
        return;
    }

    //---- Affiche les sprites ----
    lstSprites.forEach(sprite => {
        sprite.draw(pCtx);
    });

}

/*

███████╗ ██████╗ ███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                                                          

*/

function kbDown(t) {
    t.preventDefault();

    if(t.code == "KeyD") {
        keyRight = true;
    }
    if(t.code == "KeyA") {
        keyLeft = true;
    }
    if(t.code == "KeyW") {
        keyUp = true;
    }
    if(t.code == "KeyS") {
        keyDown = true;
    }
}

function kbUp(t) {
    t.preventDefault();

    if(t.code == "KeyD") {
        keyRight = false;
    }
    if(t.code == "KeyA") {
        keyLeft = false;
    }
    if(t.code == "KeyW") {
        keyUp = false;
    }
    if(t.code == "KeyS") {
        keyDown = false;
    }
}


function startGame() {

    lstSprites = [];

    // Ennemi rouge
    let imageEnemy = imageLoader.getImage("images/enemyred.png");
    spriteEnemy = new Sprite(imageEnemy);
    spriteEnemy.setTileSheet(24,24);
    spriteEnemy.setScale(4,4);
    spriteEnemy.addAnimation("TURN", [0,1,2,3,4,5], 0.07, true);
    spriteEnemy.startAnimation("TURN");


    // Player
    let imagePlayer = imageLoader.getImage("images/player.png");
    spritePlayer = new Sprite(imagePlayer);
    spritePlayer.setTileSheet(30,16);
    spritePlayer.setScale(3,3);
    spritePlayer.x = 200;
    spritePlayer.addAnimation("TURNRIGHT", [0,1,2,3,4,5,6,7,8], 0.07, false);
    spritePlayer.addAnimation("TURNUP", [9,10,11,12,13,14,15,16,17,18,19,20], 0.07, false);
    spritePlayer.startAnimation("TURNUP");
    

    // Push des sprites
    lstSprites.push(spriteEnemy);
    lstSprites.push(spritePlayer);

    gameReady = true;
}

function rnd(pmin,pmax) {
    return Math.floor(Math.random() * (pmax-pmin)) + pmin;
}