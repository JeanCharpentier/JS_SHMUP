let img;

let imageLoader = new ImageLoader();
let gameReady = false;
let lstSprites = [];

let spriteBG = null;
let lstBackgrounds = [];
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

    // Background
    lstBackgrounds.forEach(bg => {
        bg.x -= dt*200;
        if((bg.x + (bg.tileSize.x*bg.scaleX)) < 0 ) {
            bg.x = canvas.width-1s; 
        }
    });
    

    // Inputs
    if(keyRight){
        spritePlayer.x++;
    }
    if(keyLeft){
        spritePlayer.x--;
    }
    if(keyUp){
        spritePlayer.y--;
    }
    if(keyDown){
        spritePlayer.y++;
    }

    // Update des sprites
    lstSprites.forEach(sprite => {
        sprite.update(dt);
    });
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

    // Background
    let imageBG = imageLoader.getImage("images/background.png");
    spriteBG = new Sprite(imageBG);
    spriteBG.setTileSheet(320,200);
    spriteBG.setScale(2,2);

    spriteBG2 = new Sprite(imageBG);
    spriteBG2.x = canvas.width;
    spriteBG2.setTileSheet(320,200);
    spriteBG2.setScale(2,2);

    lstBackgrounds.push(spriteBG);
    lstBackgrounds.push(spriteBG2);

    


    // Ennemi rouge
    let imageEnemy = imageLoader.getImage("images/enemyred.png");
    spriteEnemy = new Sprite(imageEnemy);
    spriteEnemy.setTileSheet(24,24);
    spriteEnemy.setScale(2,2);
    spriteEnemy.addAnimation("TURN", [0,1,2,3,4,5], 0.07, true);
    spriteEnemy.startAnimation("TURN");


    // Player
    let imagePlayer = imageLoader.getImage("images/player.png");
    spritePlayer = new Sprite(imagePlayer);
    spritePlayer.setTileSheet(30,16);
    spritePlayer.setScale(2,2);
    spritePlayer.x = 200;
    spritePlayer.addAnimation("TURNRIGHT", [0,1,2,3,4,5,6,7,8], 0.07, false);
    spritePlayer.addAnimation("TURNUP", [9,10,11,12,13,14,15,16,17,18,19,20], 0.07, false);
    spritePlayer.startAnimation("TURNUP");
    

    // Push des sprites
    lstSprites.push(spriteBG);
    lstSprites.push(spriteBG2);
    lstSprites.push(spriteEnemy);
    lstSprites.push(spritePlayer);

    gameReady = true;
}

function rnd(pmin,pmax) {
    return Math.floor(Math.random() * (pmax-pmin)) + pmin;
}