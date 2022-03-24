let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d"); // Contexte de dessin

let lastUpdate = Date.now(); // Pour le DT

let interval;

function run() {

    // Delta Time
    let curUpdate = Date.now();
    let dt = (curUpdate - lastUpdate) / 1000;
    lastUpdate = curUpdate;
    // Delta Time

    update(dt);
    ctx.clearRect(0,0,canvas.width, canvas.height)
    draw(ctx);
}

function init(){
    console.log("Script is running !");
    load();
    interval = setInterval(run, 1000/60);

    /*canvas.width = window.innerWidth; // Resize auto du canevas
    canvas.height = window.innerHeight;*/
}

init();