let img;

let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;


function load() {

    document.addEventListener("keydown", kbDown, false);
    document.addEventListener("keyup", kbUp, false);

    background = new Background("images/background.png")
    background_overlay = new Background("images/background-overlay.png")
    img = new Sprite("images/ship.png");

    timer = 0;
}

function update(dt) {
    
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
    background.draw(ctx);
    background_overlay.draw(ctx);
    img.draw(ctx);
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

function rnd(pmin,pmax) {
    return Math.floor(Math.random() * (pmax-pmin)) + pmin;
}