console.log("Script is running !");

let score = 100;
let vies;

vies = 5;

const marge = 10;

vies -= 1;

console.log("vies", vies);

let hero = {
    x: 10,
    y: 50,
    speed: 2
}

console.log(hero.x);

function test(lx,ly){
    console.log(lx+" "+ly);
}

test(26,39);

for (let i = 1; i <= 10;i++) {
    console.log(i);
}

let jours = ["lun","mar","mer"];

console.log(jours[2]);

let listeEnnemis = []

for (let n=0;n<10;n++) {
    let monEnnemi = new ennemi(10*n,50);
    listeEnnemis.push(monEnnemi);
}

console.log(listeEnnemis.length);

listeEnnemis[0].hit(10);