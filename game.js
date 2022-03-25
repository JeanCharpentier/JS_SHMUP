let img;

let imageLoader = new ImageLoader();
let gameReady = false;
let lstSprites = [];

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
        img.x++;
    }
    if(keyLeft){
        img.x--;
    }
    if(keyUp){
        img.y--;
    }
    if(keyDown){
        img.y++;
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
    console.log(imageLoader.getListImages().length)

    for (let image of Object.values(imageLoader.getListImages())) {
        let mySprite = new Sprite(image);
        mySprite.x = rnd(1,600);
        mySprite.y = rnd(1,800);
        lstSprites.push(mySprite);
    }

    gameReady = true;
}

function rnd(pmin,pmax) {
    return Math.floor(Math.random() * (pmax-pmin)) + pmin;
}